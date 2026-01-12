# Security Group for EC2 Instance
resource "aws_security_group" "portfolio_ec2" {
  name        = "${var.project_name}-ec2-sg"
  description = "Security group for portfolio EC2 instance"

  # SSH Access
  ingress {
    description = "SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.allowed_ssh_cidr
  }

  # HTTP Access
  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS Access
  ingress {
    description = "HTTPS from anywhere"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound traffic
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-ec2-sg"
  }
}

# EC2 Instance
resource "aws_instance" "portfolio_server" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = var.ec2_instance_type
  key_name               = var.ssh_key_name
  vpc_security_group_ids = [aws_security_group.portfolio_ec2.id]

  # User data script to set up nginx and deploy website
  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # Update system
              apt-get update
              apt-get upgrade -y
              
              # Install nginx and Node.js
              apt-get install -y nginx curl
              curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
              apt-get install -y nodejs
              
              # Create directory for website
              mkdir -p /var/www/portfolio
              
              # Configure nginx
              cat > /etc/nginx/sites-available/portfolio <<'NGINX'
              server {
                  listen 80 default_server;
                  listen [::]:80 default_server;
                  
                  root /var/www/portfolio;
                  index index.html;
                  
                  server_name _;
                  
                  location / {
                      try_files $uri $uri/ /index.html;
                  }
                  
                  # Cache static assets
                  location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
                      expires 1y;
                      add_header Cache-Control "public, immutable";
                  }
              }
              NGINX
              
              # Enable site
              ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
              rm -f /etc/nginx/sites-enabled/default
              
              # Test and restart nginx
              nginx -t
              systemctl restart nginx
              systemctl enable nginx
              
              # Create a placeholder index.html
              cat > /var/www/portfolio/index.html <<'HTML'
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Portfolio - Deployment Pending</title>
                  <style>
                      body {
                          margin: 0;
                          padding: 0;
                          font-family: system-ui, -apple-system, sans-serif;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                          min-height: 100vh;
                          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                          color: white;
                          text-align: center;
                      }
                      .container {
                          padding: 2rem;
                      }
                      h1 {
                          font-size: 3rem;
                          margin-bottom: 1rem;
                      }
                      p {
                          font-size: 1.2rem;
                          opacity: 0.9;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <h1>🚀 Server is Ready!</h1>
                      <p>Deploy your portfolio using the deployment script.</p>
                      <p>Run: <code>./deploy-to-ec2.sh</code></p>
                  </div>
              </body>
              </html>
              HTML
              
              # Set permissions
              chown -R www-data:www-data /var/www/portfolio
              chmod -R 755 /var/www/portfolio
              
              echo "Setup completed successfully!" > /var/log/user-data.log
              EOF

  root_block_device {
    volume_size = 8
    volume_type = "gp3"
  }

  tags = {
    Name = "${var.project_name}-ec2-server"
  }
}

# Elastic IP for EC2 Instance
resource "aws_eip" "portfolio_eip" {
  instance = aws_instance.portfolio_server.id
  domain   = "vpc"

  tags = {
    Name = "${var.project_name}-eip"
  }
}
