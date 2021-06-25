terraform {
  backend "s3" {
    bucket = "calculator-terraform-backend" # nosec cspell:disable-line  - Public bucket name
    key    = "AKIAJUIXDXBKSWSVTZKA" # nosec cspell:disable-line - Public key component
    region = "eu-west-2"
  }

  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 1.22"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "digitalocean" {
  token = var.DO_ACCESS_TOKEN
}

provider "aws" {
  region = var.aws_region
  access_key  = "AKIAJUIXDXBKSWSVTZKA" # nosec cspell:disable-line - Public key component
  secret_key = var.AWS_SECRET_KEY
}

module "cluster" {
  source  = "JoelLefkowitz/cluster/digitalocean"
  version = "1.4.5"
  
  project = "calculator"
  env = "production"

  droplet_count = 1
  ssh_dir = "~/.ssh/calculator"
  
  domain = "calculator.joellefkowitz.co.uk"
  has_floating = true
}

module "staging_cluster" {
  source  = "JoelLefkowitz/cluster/digitalocean"
  version = "1.4.5"
  
  project = "calculator"
  env = "staging"

  droplet_count = 0
  ssh_dir = "~/.ssh/calculator"
  
  domain = "staging.calculator.joellefkowitz.co.uk"
  has_floating = true
}