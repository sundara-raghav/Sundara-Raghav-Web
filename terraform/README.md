# Terraform Infrastructure for Portfolio Deployment

This Terraform configuration deploys your portfolio to both AWS S3 (static website) and EC2 (with public IP).

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **AWS CLI** installed and configured
3. **Terraform** installed (v1.0+)
4. **SSH Key Pair** created in AWS EC2

## Setup Instructions

### 1. Configure AWS Credentials

```bash
aws configure
```

Enter your AWS Access Key ID, Secret Access Key, and default region.

### 2. Create SSH Key Pair (if not already created)

```bash
# Create a new key pair in AWS
aws ec2 create-key-pair \
    --key-name portfolio-key \
    --query 'KeyMaterial' \
    --output text > ../portfolio-key.pem

# Set proper permissions
chmod 600 ../portfolio-key.pem
```

### 3. Configure Variables

```bash
# Copy example variables file
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
nano terraform.tfvars
```

**Important:** Change the `s3_bucket_name` to something globally unique!

### 4. Initialize Terraform

```bash
cd terraform
terraform init
```

### 5. Review Infrastructure Plan

```bash
terraform plan
```

### 6. Deploy Infrastructure

```bash
terraform apply
```

Type `yes` when prompted.

## Outputs

After deployment, Terraform will output:

- **S3 Website URL**: Direct link to your S3 static website
- **S3 Bucket Name**: Name of the S3 bucket
- **EC2 Public IP**: Elastic IP address of your EC2 instance
- **EC2 Website URL**: Direct link to your EC2 website
- **SSH Command**: Command to SSH into your EC2 instance

View outputs anytime:
```bash
terraform output
```

## Deploy Your Portfolio

### Deploy to S3
```bash
cd ..
chmod +x deploy-to-s3.sh
./deploy-to-s3.sh
```

### Deploy to EC2
```bash
cd ..
chmod +x deploy-to-ec2.sh
./deploy-to-ec2.sh
```

## Infrastructure Components

### S3 Static Website
- Public S3 bucket with website hosting enabled
- Bucket policy for public read access
- CORS configuration
- Optimized for static content delivery

### EC2 Instance
- Ubuntu 22.04 LTS
- Nginx web server
- t2.micro instance (AWS Free Tier eligible)
- Elastic IP (static public IP)
- Security group with HTTP/HTTPS/SSH access

## Managing Infrastructure

### Update Infrastructure
```bash
terraform apply
```

### Destroy Infrastructure
```bash
terraform destroy
```

**Warning:** This will delete all resources including the S3 bucket and EC2 instance!

## Cost Considerations

- **S3**: Pay for storage and data transfer
- **EC2 t2.micro**: Free tier eligible (750 hours/month for first 12 months)
- **Elastic IP**: Free when associated with running instance
- **Data Transfer**: First 1GB/month free, then varies by region

## Security Notes

1. **SSH Access**: Default allows SSH from anywhere (0.0.0.0/0). For better security:
   ```hcl
   # In terraform.tfvars
   allowed_ssh_cidr = ["YOUR_IP_ADDRESS/32"]
   ```

2. **S3 Bucket**: Configured for public read access (required for static website hosting)

3. **SSH Key**: Keep your `.pem` file secure and never commit it to version control

## Troubleshooting

### S3 Deployment Issues
```bash
# Check bucket exists
aws s3 ls s3://your-bucket-name

# Manually sync
aws s3 sync dist/ s3://your-bucket-name/
```

### EC2 Access Issues
```bash
# Check instance status
aws ec2 describe-instances --instance-ids <instance-id>

# View user-data logs
ssh -i portfolio-key.pem ubuntu@<ec2-ip>
sudo cat /var/log/cloud-init-output.log
```

### Terraform State Issues
```bash
# Refresh state
terraform refresh

# Import existing resource (if needed)
terraform import aws_instance.portfolio_server <instance-id>
```

## Additional Resources

- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [AWS S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)
