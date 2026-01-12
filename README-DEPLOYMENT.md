# Portfolio Deployment Guide

This guide covers deploying your portfolio to AWS using Terraform in two ways:
1. **S3 Static Website** - Fast, cost-effective static hosting
2. **EC2 Instance** - Full server with public IP

## Quick Start

### 1. Install Prerequisites

```bash
# Install AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Install Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Verify installations
aws --version
terraform --version
```

### 2. Configure AWS

```bash
aws configure
# Enter:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Default region (e.g., us-east-1)
# - Default output format (json)
```

### 3. Create SSH Key Pair

```bash
# Option 1: Create in AWS and download
aws ec2 create-key-pair \
    --key-name portfolio-key \
    --query 'KeyMaterial' \
    --output text > portfolio-key.pem
chmod 600 portfolio-key.pem

# Option 2: Use existing key pair (just ensure it's named in terraform.tfvars)
```

### 4. Configure Terraform Variables

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars
```

**Edit these values:**
- `s3_bucket_name`: Must be globally unique (e.g., "yourname-portfolio-2026")
- `ssh_key_name`: Name of your AWS key pair (default: "portfolio-key")
- `allowed_ssh_cidr`: Your IP for SSH access (e.g., ["203.0.113.0/32"])

### 5. Deploy Infrastructure

```bash
# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Deploy everything
terraform apply
# Type 'yes' when prompted
```

**Wait 3-5 minutes for deployment to complete.**

### 6. Deploy Your Portfolio

#### Option A: Deploy to S3
```bash
cd ..
chmod +x deploy-to-s3.sh
./deploy-to-s3.sh
```

#### Option B: Deploy to EC2
```bash
cd ..
chmod +x deploy-to-ec2.sh
./deploy-to-ec2.sh
```

#### Option C: Deploy to Both
```bash
./deploy-to-s3.sh
./deploy-to-ec2.sh
```

## Accessing Your Portfolio

After deployment, get your URLs:
```bash
cd terraform
terraform output
```

You'll see:
- **S3 URL**: `http://your-bucket-name.s3-website-us-east-1.amazonaws.com`
- **EC2 URL**: `http://YOUR_ELASTIC_IP`

## Infrastructure Overview

### S3 Static Website
- ✅ Fast global content delivery
- ✅ Low cost (pennies per month)
- ✅ Automatic scaling
- ✅ No server management
- ❌ Static content only
- ❌ No server-side processing

### EC2 Instance
- ✅ Full server control
- ✅ Static public IP
- ✅ Can run custom applications
- ✅ SSH access
- ❌ Higher cost
- ❌ Requires maintenance

## Common Commands

### View Outputs
```bash
cd terraform
terraform output
```

### Update Infrastructure
```bash
cd terraform
terraform apply
```

### Destroy Infrastructure
```bash
cd terraform
terraform destroy
# Type 'yes' to confirm
```

### Redeploy Website
```bash
# S3
./deploy-to-s3.sh

# EC2
./deploy-to-ec2.sh
```

### SSH into EC2
```bash
ssh -i portfolio-key.pem ubuntu@YOUR_EC2_IP
```

### Check EC2 Nginx Status
```bash
ssh -i portfolio-key.pem ubuntu@YOUR_EC2_IP
sudo systemctl status nginx
sudo nginx -t
```

### View EC2 Logs
```bash
ssh -i portfolio-key.pem ubuntu@YOUR_EC2_IP
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Cost Estimates (Monthly)

### S3 Static Website
- Storage (1GB): ~$0.02
- Requests (10,000): ~$0.01
- Data Transfer (1GB): ~$0.09
- **Total: ~$0.12/month**

### EC2 t2.micro
- Instance: $8.50/month (Free tier: 750 hours/month for 12 months)
- Elastic IP: $0 (when attached to running instance)
- Storage (8GB): ~$0.80/month
- **Total: ~$9.30/month** (Free for first year with free tier)

## Troubleshooting

### S3 Bucket Name Already Exists
```bash
# Edit terraform/terraform.tfvars
s3_bucket_name = "your-unique-name-$(date +%s)"
```

### SSH Permission Denied
```bash
chmod 600 portfolio-key.pem
ssh -i portfolio-key.pem ubuntu@YOUR_EC2_IP
```

### EC2 Not Accessible
```bash
# Check security group
cd terraform
terraform output

# Wait for user-data script to complete (2-3 minutes after launch)
ssh -i portfolio-key.pem ubuntu@YOUR_EC2_IP
sudo tail -f /var/log/cloud-init-output.log
```

### Deployment Script Fails
```bash
# Install dependencies
npm install

# Build manually
npm run build

# Check AWS credentials
aws sts get-caller-identity
```

## Security Best Practices

1. **Restrict SSH Access**
   ```hcl
   # In terraform.tfvars
   allowed_ssh_cidr = ["YOUR_IP/32"]
   ```

2. **Use IAM Roles** (for production)
3. **Enable S3 Bucket Versioning**
4. **Set up CloudWatch Monitoring**
5. **Use HTTPS** (configure CloudFront + Certificate Manager)

## Next Steps

1. **Custom Domain**: Point your domain to S3 or EC2
2. **HTTPS**: Set up CloudFront with SSL certificate
3. **CI/CD**: Automate deployments with GitHub Actions
4. **Monitoring**: Set up CloudWatch alarms
5. **Backups**: Configure S3 versioning and EC2 snapshots

## Support

- [Terraform Documentation](https://developer.hashicorp.com/terraform/docs)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Project Repository](https://github.com/sundara-raghav/Sundara-Raghav-Web)
