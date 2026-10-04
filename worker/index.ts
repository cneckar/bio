import { withPathHandler } from '../vendor/404-path-handler/src/index.ts';

interface Env {
  ASSETS: Fetcher;
}

// Static assets in dist/ are served by Cloudflare before this Worker runs, so
// it only sees requests that matched no asset. The asset binding stays the
// origin so the path handler gets the real 404 to act on.
const site = {
  fetch(request: Request, env: Env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
};

export default withPathHandler<Env, typeof site>(site);
