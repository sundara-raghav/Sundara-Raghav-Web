output "s3_website_endpoint" {
  description = "S3 static website endpoint"
  value       = aws_s3_bucket_website_configuration.portfolio_website.website_endpoint
}

output "s3_website_url" {
  description = "S3 static website URL"
  value       = "http://${aws_s3_bucket_website_configuration.portfolio_website.website_endpoint}"
}

output "s3_bucket_name" {
  description = "S3 bucket name"
  value       = aws_s3_bucket.portfolio_website.id
}

output "ec2_public_ip" {
  description = "EC2 instance public IP (Elastic IP)"
  value       = aws_eip.portfolio_eip.public_ip
}

output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.portfolio_server.id
}

output "ec2_website_url" {
  description = "EC2 website URL"
  value       = "http://${aws_eip.portfolio_eip.public_ip}"
}

output "ssh_command" {
  description = "SSH command to connect to EC2"
  value       = "ssh -i ${var.ssh_key_name}.pem ubuntu@${aws_eip.portfolio_eip.public_ip}"
}
