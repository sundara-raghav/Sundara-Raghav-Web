#!/bin/bash

# Deploy Portfolio to S3 Static Website
# This script builds the project and uploads it to S3

set -e

echo "🚀 Starting S3 deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get S3 bucket name from Terraform output
cd terraform
BUCKET_NAME=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")
cd ..

if [ -z "$BUCKET_NAME" ]; then
    echo -e "${YELLOW}⚠️  Could not get bucket name from Terraform. Using default...${NC}"
    BUCKET_NAME="sundara-raghav-portfolio"
fi

echo -e "${BLUE}📦 Building project...${NC}"
npm install
npm run build

echo -e "${BLUE}☁️  Uploading to S3 bucket: $BUCKET_NAME${NC}"

# Upload dist folder to S3
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --delete \
    --cache-control "public, max-age=31536000, immutable" \
    --exclude "*.html" \
    --exclude "*.json"

# Upload HTML files without cache
aws s3 sync dist/ s3://$BUCKET_NAME/ \
    --exclude "*" \
    --include "*.html" \
    --include "*.json" \
    --cache-control "public, max-age=0, must-revalidate"

echo -e "${GREEN}✅ Deployment completed!${NC}"

# Get website URL
cd terraform
WEBSITE_URL=$(terraform output -raw s3_website_url 2>/dev/null || echo "")
cd ..

if [ -n "$WEBSITE_URL" ]; then
    echo -e "${GREEN}🌐 Your website is live at: ${WEBSITE_URL}${NC}"
else
    echo -e "${YELLOW}⚠️  Run 'cd terraform && terraform output' to get your website URL${NC}"
fi
