# Sullivan Bruck Architects — Squarespace Custom Code

**Site:** https://sba-2.squarespace.com/
**CDN:** https://sullivan-bruck-sqsp.pages.dev

## Deployment

Push to `main` branch auto-deploys to Cloudflare Pages.
Claude branches (`claude/**`) auto-merge to `main` via GitHub Actions.

## Squarespace Code Injection

### Header (Custom CSS)
```html
<link rel="stylesheet" href="https://sullivan-bruck-sqsp.pages.dev/custom.css">
```

### Footer (Custom JS)
```html
<script src="https://sullivan-bruck-sqsp.pages.dev/custom.js"></script>
```

## File Structure

- `custom.css` — All custom CSS (loaded via header injection)
- `custom.js` — All custom JavaScript (loaded via footer injection)
- `.github/workflows/auto-merge-claude.yml` — Auto-merge Claude branches

## Section Anchor IDs

Map of manual section anchor IDs used for scoping:

| Section | Anchor ID | Page |
|---------|-----------|------|
| Portfolio grid | `#portfolio` | Portfolio |
| Team grid | `#team` | About |
| Philosophy | `#philosophy` | About |
| Contact form | `#contact` | Contact |
| Hero slideshow | `#hero` | Homepage |

## Selector Strategy

1. Manual section anchor IDs (`#portfolio`, `#team`, etc.)
2. Official `data-sqsp-*` hooks (`[data-sqsp-block="text"]`, `[data-sqsp-button]`)
3. `section[data-section-id="..."]` for sections without manual anchors
4. Body context (`body.collection-type-portfolio.view-item`)
5. Observed wrappers only as last resort (marked with comments)
