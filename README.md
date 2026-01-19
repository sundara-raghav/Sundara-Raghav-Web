# 🌐 Sundara Raghav - Web Portfolio

A modern, responsive personal web portfolio showcasing projects, skills, and professional achievements. Deployed on AWS with Infrastructure as Code using Terraform.

## ✨ Features

- 📱 **Fully Responsive Design** - Mobile, tablet, and desktop optimized
- 🎨 **Modern UI/UX** - Clean and professional interface
- ⚡ **High Performance** - Optimized assets and fast load times
- 🔄 **Interactive Components** - Engaging user experience
- 📊 **Project Showcase** - Display your best work
- 💼 **Professional Layout** - Impress potential clients and employers
- 🌐 **SEO Optimized** - Better search engine visibility

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Tailwind CSS
- **JavaScript** - Interactive functionality
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformations

### Deployment & Infrastructure
- **AWS S3** - Static website hosting
- **AWS EC2** - Scalable compute instances
- **Terraform** - Infrastructure as Code
- **GitHub** - Version control and repository
- **GitHub Codespaces** - Cloud development environment

### Build Tools
- **npm** - Package management
- **PostCSS** - CSS processing

## 📁 Project Structure

```
Sundara-Raghav-Web/
├── src/                          # Source files
│   ├── main.js                   # Main JavaScript
│   ├── counter.js                # Component logic
│   └── style.css                 # Styles
├── public/                        # Static assets
│   └── images/                   # Image assets
├── aws/                           # AWS configuration
│   ├── install                   # AWS CLI setup script
│   └── README.md                 # AWS deployment guide
├── terraform/                     # Infrastructure as Code
│   ├── main.tf                   # Terraform main config
│   ├── variables.tf              # Variable definitions
│   ├── outputs.tf                # Output values
│   ├── ec2-instance.tf           # EC2 configuration
│   ├── s3-static-website.tf      # S3 configuration
│   ├── terraform.tfvars          # Terraform variables
│   └── README.md                 # Terraform guide
├── deploy-to-s3.sh               # S3 deployment script
├── deploy-to-ec2.sh              # EC2 deployment script
├── package.json                  # Node dependencies
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
└── README-DEPLOYMENT.md          # Detailed deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Git
- AWS Account (for deployment)
- Terraform (for infrastructure setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sundara-raghav/Sundara-Raghav-Web.git
   cd Sundara-Raghav-Web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local development**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Deployment Options

### Option 1: Deploy to AWS S3 (Static Website)

**Fastest way to get your portfolio online!**

```bash
./deploy-to-s3.sh
```

**Prerequisites:**
- AWS CLI configured with credentials
- S3 bucket created

**What it does:**
- Builds the project
- Uploads to S3
- Makes files publicly accessible
- Your site is live!

See [AWS README](aws/README.md) for detailed instructions.

### Option 2: Deploy to AWS EC2 (Full Server)

**For advanced hosting with server capabilities**

```bash
./deploy-to-ec2.sh
```

**Prerequisites:**
- AWS EC2 instance running
- SSH key configured
- EC2 security groups properly configured

**What it does:**
- Connects to your EC2 instance
- Deploys the application
- Sets up web server
- Configures domain (optional)

### Option 3: Infrastructure as Code with Terraform

**Automated infrastructure provisioning**

```bash
cd terraform/
terraform init
terraform plan
terraform apply
```

**What Terraform manages:**
- EC2 instances
- S3 buckets
- Security groups
- DNS records (if applicable)
- VPC configuration

See [Terraform README](terraform/README.md) for detailed setup.

## 📖 Deployment Guides

- 📄 **[Complete Deployment Guide](README-DEPLOYMENT.md)** - Step-by-step instructions for all deployment methods
- 📄 **[AWS Guide](aws/README.md)** - AWS-specific configuration and setup
- 📄 **[Terraform Guide](terraform/README.md)** - Infrastructure as Code setup and management

## 💻 Local Development

### Available npm Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Watch for changes
npm run watch

# Lint code
npm run lint
```

### Development Workflow

1. Make changes to source files in `src/`
2. Changes auto-reload in browser during development
3. Test on different devices/screen sizes
4. Build production version with `npm run build`
5. Deploy using one of the deployment scripts

## 🎨 Customization

### Edit Portfolio Content

1. Open `index.html` to modify page structure
2. Update `src/style.css` for styling
3. Modify `src/main.js` for interactivity
4. Update `public/images/` with your assets

### Tailwind CSS Configuration

Edit `tailwind.config.js` to customize:
- Colors
- Typography
- Spacing
- Breakpoints
- Custom utilities

### PostCSS Configuration

Modify `postcss.config.js` for CSS processing preferences.

## 🔐 Security Notes

⚠️ **Important Security Tips:**

- Never commit `.env` files with credentials
- Rotate AWS access keys regularly
- Use IAM roles instead of root credentials
- Keep dependencies updated: `npm update`
- Review Terraform state files (contains sensitive data)
- Use GitHub secrets for CI/CD credentials

## 📊 Performance Optimization

- ✅ Minified CSS and JavaScript
- ✅ Optimized images
- ✅ Fast S3 hosting with CloudFront
- ✅ Lazy loading components
- ✅ SEO-friendly structure

## 🐛 Troubleshooting

### Issue: Deploy script fails
- Check AWS CLI configuration: `aws configure`
- Verify AWS credentials have proper permissions
- Ensure S3 bucket exists and is accessible

### Issue: Terraform apply fails
- Run `terraform validate` to check syntax
- Check `terraform.tfvars` for correct values
- Verify AWS credentials are set

### Issue: Site not loading after S3 deploy
- Check S3 bucket policies allow public access
- Verify index.html is in the bucket
- Clear browser cache

See [Deployment Guide](README-DEPLOYMENT.md) for more troubleshooting.

## 📈 Next Steps

1. ✅ Customize portfolio content
2. ✅ Update images and branding
3. ✅ Configure AWS account
4. ✅ Deploy to production
5. ✅ Set up custom domain (optional)
6. ✅ Monitor and maintain

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork and adapt for your own use!

## 📄 License

This project is open source. See LICENSE file for details.

## 📞 Contact & Links

- 🔗 **GitHub:** [@sundara-raghav](https://github.com/sundara-raghav)
- 💼 **Portfolio:** Check your deployed site!
- 📧 **Email:** Update with your contact info

## 🎓 Learning Resources

- [AWS Documentation](https://docs.aws.amazon.com/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

## ✨ Credits

Built with modern web technologies and deployed with cloud infrastructure best practices.

---

**Last Updated:** January 2026

**Status:** ✅ Production Ready

**Hosted On:** AWS (S3 + CloudFront / EC2)

**Repository:** https://github.com/sundara-raghav/Sundara-Raghav-Web

---

### 🚀 Ready to Deploy?

Start with the [Deployment Guide](README-DEPLOYMENT.md) or run one of the deployment scripts to get your portfolio live!

```bash
# Deploy to S3 (recommended for quick start)
./deploy-to-s3.sh

# Or deploy to EC2 for more control
./deploy-to-ec2.sh
```

Happy coding! 💻✨
