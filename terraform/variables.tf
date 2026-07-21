# terraform/variables.tf

variable "aws_region" {
  description = "AWS Region"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment (dev/staging/production)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "production"], var.environment)
    error_message = "Environment must be dev, staging, or production."
  }
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "private_subnet_cidrs" {
  description = "Private subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "public_subnet_cidrs" {
  description = "Public subnet CIDR blocks"
  type        = list(string)
  default     = ["10.0.101.0/24", "10.0.102.0/24"]
}

variable "kubernetes_version" {
  description = "Kubernetes version"
  type        = string
  default     = "1.30"
}

variable "node_instance_type" {
  description = "EC2 instance type for worker nodes"
  type        = string
  default     = "t3.medium"
}

variable "node_min_size" {
  description = "Minimum worker nodes"
  type        = number
  default     = 2
}

variable "node_max_size" {
  description = "Maximum worker nodes"
  type        = number
  default     = 4
}

variable "node_desired_size" {
  description = "Desired worker nodes"
  type        = number
  default     = 2
}

# ✅ ADDED - Was used in argocd.tf but never defined!
variable "domain_name" {
  description = "Root domain name for the application"
  type        = string
  # Example: "fashionhub.com"
}

# ✅ ADDED - Was used in argocd.tf but never defined!
variable "github_personal_access_token" {
  description = "GitHub PAT for ArgoCD repository access"
  type        = string
  sensitive   = true  # ✅ Marked sensitive - won't show in logs!
}

# ✅ ADDED - GitHub org/repo for OIDC
variable "github_repo" {
  description = "GitHub repository in format org/repo"
  type        = string
  default     = "Nisansala23/local-fashion-hub"
}