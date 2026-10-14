import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { buildBodyHtml, buildHeadHtml, buildJsonLd, buildText } from './src/data/graph.ts';

// Injects the entity-relationship graph (src/data/knowledge.ts) into index.html
// as meta tags + JSON-LD, and publishes it as /relationships.jsonld and
// /relationships.txt, so crawlers that don't run JS still see it.
function knowledgeGraph(): Plugin {
  const files: Record<string, () => string> = {
    'relationships.jsonld': () => JSON.stringify(buildJsonLd(), null, 2) + '\n',
    'relationships.txt': buildText,
  };
  const types: Record<string, string> = {
    'relationships.jsonld': 'application/ld+json; charset=utf-8',
    'relationships.txt': 'text/plain; charset=utf-8',
  };
  return {
    name: 'knowledge-graph',
    transformIndexHtml(html) {
      return html
        .replace('<!-- kg:head -->', buildHeadHtml())
        .replace('<!-- kg:body -->', buildBodyHtml());
    },
    generateBundle() {
      for (const [fileName, build] of Object.entries(files)) {
        this.emitFile({ type: 'asset', fileName, source: build() });
      }
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req as { url?: string }).url ?? '';
        const name = url.split('?')[0].replace(/^\//, '');
        if (!(name in files)) return next();
        res.setHeader('Content-Type', types[name]);
        res.end(files[name]());
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), knowledgeGraph()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    copyPublicDir: true,
  },
  publicDir: 'public',
  server: {
    // Serve static files from public directory
    fs: {
      allow: ['..']
    }
  }
});
