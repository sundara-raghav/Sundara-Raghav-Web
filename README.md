# 🌐 Sundara Raghav — Personal Portfolio

A modern, responsive personal portfolio website built with **Vite**, **GSAP animations**, and served via **Docker + Nginx**. Features a premium dark/light mode UI, scroll-triggered animations, redesigned skills section, and a fully optimized production build.

[![GitHub](https://img.shields.io/badge/GitHub-sundara--raghav-181717?logo=github)](https://github.com/sundara-raghav/Sundara-Raghav-Web)
[![Docker Hub](https://img.shields.io/badge/Docker%20Hub-sundararaghav0306%2Fportfolio-2496ED?logo=docker)](https://hub.docker.com/r/sundararaghav0306/portfolio)

---

## ✨ Features

- 📱 **Fully Responsive** — Mobile, tablet, and desktop optimized
- 🌙 **Dark / Light Mode** — Toggle with smooth transitions
- 🎬 **Scroll Animations** — Fade-up, slide-in, and stagger effects via GSAP & Intersection Observer
- 🧠 **Skills Section** — Categorized skill badges + animated scrolling marquee
- ⚡ **High Performance** — Vite-built, minified assets, gzip via Nginx
- 📄 **Resume Download** — Direct PDF download link
- 🐳 **Dockerized** — Single command to run anywhere

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 + Tailwind CSS v3 |
| Interactivity | JavaScript (ES Modules) |
| Animations | GSAP 3 |
| Build Tool | Vite 5 |
| CSS Processing | PostCSS + Autoprefixer |
| Container | Docker (multi-stage build) |
| Web Server | Nginx 1.27 (Alpine) |
| Version Control | Git + GitHub |

---

## 📁 Project Structure

```
Sundara-Raghav-Web/
├── public/
│   └── resume_.pdf            # Resume PDF
├── src/                       # Source assets
├── dist/                      # Production build output (auto-generated)
│   ├── index.html
│   ├── resume_.pdf
│   └── assets/
│       ├── index-*.css
│       └── index-*.js
├── index.html                 # Main HTML entry point
├── main.js                    # JavaScript (animations, interactions)
├── style.css                  # Global styles
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite configuration (if present)
├── Dockerfile                 # Multi-stage Docker build
├── nginx.conf                 # Nginx server config (SPA + gzip)
└── .dockerignore              # Docker build context exclusions
```

---

## 🚀 Quick Start

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/sundara-raghav/Sundara-Raghav-Web.git
cd Sundara-Raghav-Web

# 2. Install dependencies
npm install

# 3. Start dev server (hot reload)
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build       # Outputs to dist/
npm run preview     # Preview the production build locally
```

---

## 🐳 Docker

### Pull & Run from Docker Hub

```bash
docker pull sundararaghav0306/portfolio:latest
docker run -d -p 8080:80 --name portfolio sundararaghav0306/portfolio:latest
```

Open **http://localhost:8080** 🎉

### Build Locally

```bash
# Build the image
docker build -t sundara-portfolio .

# Run the container
docker run -d -p 8080:80 --name portfolio sundara-portfolio

# Stop & remove
docker stop portfolio && docker rm portfolio
```

### Docker Image Details

| Property | Value |
|---|---|
| Base (build) | `node:20-alpine` |
| Base (serve) | `nginx:1.27-alpine` |
| Exposed Port | `80` |
| Docker Hub | [`sundararaghav0306/portfolio`](https://hub.docker.com/r/sundararaghav0306/portfolio) |

---

## 🎨 Customization

| What to edit | File |
|---|---|
| Page content & sections | `index.html` |
| Animations & interactions | `main.js` |
| Global styles & themes | `style.css` |
| Tailwind tokens | `tailwind.config.js` |
| Nginx server config | `nginx.conf` |
| Resume PDF | `public/resume_.pdf` |

---

## 📦 npm Scripts

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # Build production bundle → dist/
npm run preview   # Preview production build locally
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|---|---|
| Port 8080 already in use | Use `-p 9090:80` instead |
| Container name conflict | Run `docker rm portfolio` first |
| Docker push fails (network drop) | Re-run `docker push` — layers are cached |
| Resume not downloading | Ensure `public/resume_.pdf` exists and rebuild |

---

## 📞 Contact & Links

- 🔗 **GitHub:** [@sundara-raghav](https://github.com/sundara-raghav)
- 🐳 **Docker Hub:** [sundararaghav0306/portfolio](https://hub.docker.com/r/sundararaghav0306/portfolio)

---

**Last Updated:** March 2026 &nbsp;|&nbsp; **Status:** ✅ Production Ready &nbsp;|&nbsp; **Build:** Vite + Docker + Nginx
