#!/bin/bash

# Deploy Portfolio to EC2 Instance
# This script builds the project and deploys it to the EC2 server

set -e

echo "🚀 Starting EC2 deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get EC2 IP and SSH key from Terraform output
cd terraform
EC2_IP=$(terraform output -raw ec2_public_ip 2>/dev/null || echo "")
SSH_KEY=$(terraform output -raw ssh_key_name 2>/dev/null || echo "portfolio-key")
cd ..

if [ -z "$EC2_IP" ]; then
    echo -e "${RED}❌ Could not get EC2 IP from Terraform. Make sure infrastructure is deployed.${NC}"
    exit 1
fi

SSH_KEY_FILE="${SSH_KEY}.pem"

if [ ! -f "$SSH_KEY_FILE" ]; then
    echo -e "${RED}❌ SSH key file '${SSH_KEY_FILE}' not found.${NC}"
    echo -e "${YELLOW}Please ensure your AWS key pair PEM file is in the current directory.${NC}"
    exit 1
fi

# Ensure correct permissions on SSH key
chmod 600 "$SSH_KEY_FILE"

echo -e "${BLUE}📦 Building project...${NC}"
npm install
npm run build

echo -e "${BLUE}🔄 Deploying to EC2: $EC2_IP${NC}"

# Create a tarball of the dist folder
tar -czf dist.tar.gz -C dist .

# Copy files to EC2
echo -e "${BLUE}📤 Uploading files...${NC}"
scp -i "$SSH_KEY_FILE" -o StrictHostKeyChecking=no dist.tar.gz ubuntu@$EC2_IP:/tmp/

# Extract and deploy on EC2
echo -e "${BLUE}🔧 Extracting files on server...${NC}"
ssh -i "$SSH_KEY_FILE" -o StrictHostKeyChecking=no ubuntu@$EC2_IP << 'ENDSSH'
    sudo rm -rf /var/www/portfolio/*
    sudo tar -xzf /tmp/dist.tar.gz -C /var/www/portfolio/
    sudo chown -R www-data:www-data /var/www/portfolio
    sudo chmod -R 755 /var/www/portfolio
    rm /tmp/dist.tar.gz
    sudo nginx -t && sudo systemctl reload nginx
ENDSSH

# Clean up local tarball
rm dist.tar.gz

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${GREEN}🌐 Your website is live at: http://${EC2_IP}${NC}"
echo -e "${BLUE}💡 To SSH into your server: ssh -i ${SSH_KEY_FILE} ubuntu@${EC2_IP}${NC}"
