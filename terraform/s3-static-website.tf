# S3 Bucket for Static Website Hosting
resource "aws_s3_bucket" "portfolio_website" {
  bucket = var.s3_bucket_name

  tags = {
    Name        = "${var.project_name}-website"
    Environment = "production"
  }
}

# S3 Bucket Public Access Block Configuration
resource "aws_s3_bucket_public_access_block" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio_website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# S3 Bucket Ownership Controls
resource "aws_s3_bucket_ownership_controls" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio_website.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# S3 Bucket ACL
resource "aws_s3_bucket_acl" "portfolio_website" {
  depends_on = [
    aws_s3_bucket_ownership_controls.portfolio_website,
    aws_s3_bucket_public_access_block.portfolio_website,
  ]

  bucket = aws_s3_bucket.portfolio_website.id
  acl    = "public-read"
}

# S3 Bucket Website Configuration
resource "aws_s3_bucket_website_configuration" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio_website.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# S3 Bucket Policy for Public Read Access
resource "aws_s3_bucket_policy" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio_website.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.portfolio_website.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.portfolio_website]
}

# CORS Configuration for S3 Bucket
resource "aws_s3_bucket_cors_configuration" "portfolio_website" {
  bucket = aws_s3_bucket.portfolio_website.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}
