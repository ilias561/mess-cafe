# mess-cms-auth

Cloudflare Worker that handles GitHub OAuth for Decap CMS on mess-cafe.pages.dev.

## Deploy
npm install
npx wrangler login
npx wrangler deploy

## Secrets (required)
npx wrangler secret put GITHUB_CLIENT_ID
npx wrangler secret put GITHUB_CLIENT_SECRET