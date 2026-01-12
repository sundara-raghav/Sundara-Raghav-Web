variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "sundara-portfolio"
}

variable "s3_bucket_name" {
  description = "S3 bucket name for static website (must be globally unique)"
  type        = string
  default     = "sundara-raghav-portfolio"
}

variable "ec2_instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "ssh_key_name" {
  description = "Name of the SSH key pair for EC2 access"
  type        = string
  default     = "portfolio-key"
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH into EC2"
  type        = list(string)
  default     = ["0.0.0.0/0"] # Change this to your IP for better security
}
