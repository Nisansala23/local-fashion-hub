# terraform/argocd.tf

# ArgoCD Namespace
resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
    labels = {
      "app.kubernetes.io/name"       = "argocd"
      "app.kubernetes.io/managed-by" = "terraform"
    }
  }
  depends_on = [module.eks]
}

# ✅ FIXED - Removed helm_repository (deprecated!)
# Install ArgoCD via Helm directly
resource "helm_release" "argocd" {
  name       = "argocd"
  # ✅ Repository URL directly in helm_release
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "7.3.4"          # ✅ Updated to latest stable!
  namespace  = kubernetes_namespace.argocd.metadata[0].name

  values = [
    yamlencode({
      global = {
        domain = "argocd.${var.domain_name}"
      }

      configs = {
        cm = {
          "admin.enabled" = true  # ✅ Keep true for initial setup!
        }
        rbac = {
          "policy.default" = "role:readonly"
        }
      }

      server = {
        ingress = {
          enabled          = true
          ingressClassName = "nginx"
          hosts            = ["argocd.${var.domain_name}"]
          tls = [
            {
              secretName = "argocd-tls"
              hosts      = ["argocd.${var.domain_name}"]
            }
          ]
        }
        service = {
          type = "ClusterIP"
        }
      }

      applicationController = {
        replicas = 1
      }

      repoServer = {
        replicas = 1  # ✅ Start with 1, scale when needed
      }

      notifications = {
        enabled = true
      }
    })
  ]

  depends_on = [kubernetes_namespace.argocd]
}

# GitHub Repository Secret for ArgoCD
resource "kubernetes_secret" "github_repo" {
  metadata {
    name      = "github-credentials"
    namespace = kubernetes_namespace.argocd.metadata[0].name
    labels = {
      "argocd.argoproj.io/secret-type" = "repository"
    }
  }

  data = {
    type     = "git"
    url      = "https://github.com/${var.github_repo}.git"
    password = var.github_personal_access_token
    username = "git"
  }

  type       = "Opaque"
  depends_on = [kubernetes_namespace.argocd]
}

# App Namespace
resource "kubernetes_namespace" "fashion_hub_prod" {
  metadata {
    name = "fashion-hub-prod"
    labels = {
      "app.kubernetes.io/managed-by" = "argocd"
    }
  }
  depends_on = [helm_release.argocd]
}

resource "kubernetes_namespace" "fashion_hub_dev" {
  metadata {
    name = "fashion-hub-dev"
    labels = {
      "app.kubernetes.io/managed-by" = "argocd"
    }
  }
  depends_on = [helm_release.argocd]
}

# ✅ FIXED - Correct GitHub OIDC Provider
resource "aws_iam_openid_connect_provider" "github_actions" {
  # ✅ CORRECT GitHub OIDC URL
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]

  # ✅ GitHub's OIDC thumbprint (stable value)
  thumbprint_list = [
    "6938fd4d98bab03faadb97b34396831e3780aea1",
    "1c58a3a8518e8759bf075b76b750d4f2df264fcd"
  ]

  tags = local.common_tags
}

# IAM Role for GitHub Actions
resource "aws_iam_role" "github_actions" {
  name = "${local.project}-github-actions-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Federated = aws_iam_openid_connect_provider.github_actions.arn
        }
        Action = "sts:AssumeRoleWithWebIdentity"
        Condition = {
          StringEquals = {
            # ✅ Correct GitHub OIDC claims
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com"
          }
          StringLike = {
            # ✅ Allow all branches and PRs
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo}:*"
          }
        }
      }
    ]
  })

  tags = local.common_tags
}

# ✅ FIXED - Split into two statements
# GetAuthorizationToken must use "*" as resource
resource "aws_iam_role_policy" "github_actions_ecr" {
  name = "${local.project}-github-actions-ecr-policy"
  role = aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # ✅ Auth token requires "*" - cannot scope to specific repo
        Sid    = "ECRAuth"
        Effect = "Allow"
        Action = ["ecr:GetAuthorizationToken"]
        Resource = "*"
      },
      {
        # ✅ Image operations scoped to specific repo
        Sid    = "ECROperations"
        Effect = "Allow"
        Action = [
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:BatchCheckLayerAvailability",
          "ecr:DescribeRepositories",
          "ecr:DescribeImages"
        ]
        Resource = aws_ecr_repository.app.arn
      },
      {
        # ✅ EKS access for kubectl in GitHub Actions
        Sid    = "EKSAccess"
        Effect = "Allow"
        Action = [
          "eks:DescribeCluster",
          "eks:ListClusters"
        ]
        Resource = "*"
      }
    ]
  })
}