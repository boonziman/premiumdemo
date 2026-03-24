# Premium Business Advisory — Demo Site

A high-end corporate advisory demo website built with Hugo and Tailwind CSS. This site demonstrates premium web design with cinematic animations, dark luxury aesthetics, and institutional-grade typography.

## 🏗️ Project Structure

```
Premium custom repo/
├── archetypes/          # Hugo content templates
├── content/             # Page content (Markdown with front matter)
│   ├── _index.md        # Home page
│   ├── services.md      # Services page
│   ├── about.md         # About page
│   └── contact.md       # Contact page
├── layouts/             # Hugo HTML templates
│   ├── _default/
│   │   └── baseof.html  # Base template (shared HTML structure)
│   ├── index.html       # Home page template
│   ├── page/            # Individual page templates
│   │   ├── services.html
│   │   ├── about.html
│   │   └── contact.html
│   └── partials/        # Reusable template fragments
│       ├── head.html     # <head> section (fonts, CSS, SEO)
│       ├── nav.html      # Navigation bar
│       └── footer.html   # Footer
├── static/              # Static assets (served as-is)
│   ├── css/
│   │   └── main.css     # All custom styles & animations
│   ├── js/
│   │   └── main.js      # Interactions & scroll effects
│   └── images/          # Image assets (add local images here)
│       └── README.md    # Image organization guide
├── hugo.toml            # Hugo configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- [Hugo](https://gohugo.io/installation/) (Extended edition recommended)

### Development
```bash
# Start the development server
hugo server --buildDrafts

# The site will be available at http://localhost:1313
```

### Production Build
```bash
# Generate the static site
hugo --minify

# Output will be in the /public/ directory
```

## 🎨 Design System

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#C5A059` | Metallic bronze/gold — CTAs, accents |
| Background | `#050505` | Deep void black |
| Surface | `#121212` | Cards, elevated surfaces |
| Text | `#F0F0F0` | Primary reading text |
| Muted | `#737373` | Secondary text, labels |
| Border | `#2C2C2C` | Structural dividers |

**Typography:** Manrope (headings & body)  
**Border Radius:** 0px — sharp, authoritative edges  
**Animations:** Cinematic easing with `cubic-bezier(0.16, 1, 0.3, 1)`

## 📄 Pages

1. **Home** — Cinematic parallax hero, client marquee, editorial content block, CTA footer
2. **Services** — 6-card grid with hover-dim sibling effect
3. **About** — Asymmetric sticky-scroll layout with leadership portraits
4. **Contact** — 50/50 split with floating-label form and simulated dark map

## 🌐 Deployment

This site is ready to deploy to GitHub Pages, Netlify, or Vercel.

### GitHub Pages
1. Push this repo to GitHub
2. Go to Settings → Pages → Source: GitHub Actions
3. Use the Hugo GitHub Action for automatic builds

## 📸 Images

Images are currently loaded from external URLs. To use local images:
1. Save images to `static/images/`
2. Reference them in templates as `/images/your-image.jpg`
3. See `static/images/README.md` for the recommended folder structure

## 📝 License

Demo site for portfolio purposes.
