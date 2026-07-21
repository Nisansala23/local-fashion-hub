locals {
  project     = "fashion-hub"
  environment = var.environment

  common_tags = {
    Project     = local.project
    Environment = local.environment
    ManagedBy   = "Terraform"
  }
}