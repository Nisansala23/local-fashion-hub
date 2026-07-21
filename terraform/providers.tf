# terraform/providers.tf

terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    # ✅ ADDED - Required for kubernetes_ resources
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.27"
    }
    # ✅ ADDED - Required for helm_release resources
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.13"
    }
    # ✅ ADDED - Required for tls_certificate data source
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  # ✅ ADDED - Remote state in S3
  backend "s3" {
    bucket         = "fashion-hub-terraform-state"
    key            = "fashion-hub/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "fashion-hub-terraform-locks"
  }
}

# AWS Provider
provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project   = "fashion-hub"
      ManagedBy = "Terraform"
    }
  }
}

# ✅ ADDED - Kubernetes provider
# Connects to EKS cluster after it's created
provider "kubernetes" {
  host                   = module.eks.cluster_endpoint
  cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

  exec {
    api_version = "client.authentication.k8s.io/v1beta1"
    command     = "aws"
    args = [
      "eks",
      "get-token",
      "--cluster-name",
      module.eks.cluster_name,
      "--region",
      var.aws_region
    ]
  }
}

# ✅ ADDED - Helm provider
provider "helm" {
  kubernetes {
    host                   = module.eks.cluster_endpoint
    cluster_ca_certificate = base64decode(module.eks.cluster_certificate_authority_data)

    exec {
      api_version = "client.authentication.k8s.io/v1beta1"
      command     = "aws"
      args = [
        "eks",
        "get-token",
        "--cluster-name",
        module.eks.cluster_name,
        "--region",
        var.aws_region
      ]
    }
  }
}