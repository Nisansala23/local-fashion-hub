Vterraform {
  required_providers {
    kind = {
      source  = "tehcyx/kind"
      version = "0.5.1"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "2.31.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "2.14.0"
    }
  }
}

# 1️⃣ PROVISION LOCAL MULTI-NODE KUBERNETES CLUSTER (KIND)
resource "kind_cluster" "local_cluster" {
  name            = "fashion-hub-cluster"
  kubeconfig_path = expandpath("~/.kube/config")
  wait_for_ready  = true

  kind_config {
    kind        = "Cluster"
    api_version = "kind.x-k8s.io/v1alpha4"

    node {
      role = "control-plane"
      
      # Route port 30080 from your host machine into the K8s cluster for browser testing
      extra_port_mappings {
        container_port = 30080
        host_port      = 30080
        listen_address = "0.0.0.0"
        protocol       = "TCP"
      }
    }
    node {
      role = "worker"
    }
  }
}

provider "kubernetes" {
  config_path = kind_cluster.local_cluster.kubeconfig_path
}

provider "helm" {
  kubernetes {
    config_path = kind_cluster.local_cluster.kubeconfig_path
  }
}

# 2️⃣ AUTOMATICALLY DEPLOY ARGOCD VIA HELM ONCE CLUSTER IS READY
resource "kubernetes_namespace" "argocd" {
  metadata { name = "argocd" }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = "argocd"
  version    = "7.3.7"
  depends_on = [kubernetes_namespace.argocd, kind_cluster.local_cluster]
}

# 3️⃣ AUTOMATICALLY DEPLOY PROMETHEUS & GRAFANA OBSERVABILITY STACK
resource "kubernetes_namespace" "monitoring" {
  metadata { name = "monitoring" }
}

resource "helm_release" "prometheus_stack" {
  name       = "kube-prometheus-stack"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  namespace  = "monitoring"
  version    = "61.3.0"

  set {
    name  = "grafana.service.type"
    value = "NodePort"
  }
  set {
    name  = "grafana.service.nodePort"
    value = "32000" # Grafana dashboard will be exposed at http://localhost:32000
  }
  depends_on = [kubernetes_namespace.monitoring, kind_cluster.local_cluster]
}
