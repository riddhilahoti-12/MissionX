# MissionX Terraform Infrastructure-as-Code (IaC) Specification
# Provisioning AWS EKS / GCP GKE Multi-Cloud Kubernetes Clusters

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "missionx_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "missionx-production-vpc"
    Environment = "Production"
  }
}

resource "aws_eks_cluster" "missionx_eks" {
  name     = "missionx-eks-cluster"
  role_arn = "arn:aws:iam::123456789012:role/MissionXEksRole"

  vpc_config {
    subnet_ids = ["subnet-12345678", "subnet-87654321"]
  }
}
