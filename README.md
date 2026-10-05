# Cris Neckar Bio Site

## Deployment

The site runs as a Cloudflare Worker (`wrangler.jsonc`). `npm run build` writes
the static site to `dist/`, which Cloudflare serves as Worker static assets.
Requests that match no asset go through `worker/index.ts`, which wraps the asset
server with [404-path-handler](https://github.com/cneckar/404-path-handler)
using its default config.

The library is vendored as a git submodule, so clone with
`git clone --recurse-submodules`, or run `git submodule update --init` in an
existing checkout.

- `npm run dev:worker`: build and run the Worker locally
- `npm run deploy`: build and deploy

Pushes to `published` deploy through `.github/workflows/deploy.yml`, which needs
three repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and
`PATH_HANDLER_DEPLOY_KEY`, the private half of a read-only deploy key on
cneckar/404-path-handler that the workflow uses to fetch the private submodule.
