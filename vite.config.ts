import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { buildHeadHtml, buildJsonLd, buildText } from './src/data/graph.ts';

// Injects the entity-relationship meta tags and JSON-LD built from
// src/data/knowledge.ts into <head>, so crawlers that don't run JS see them,
// and publishes the same data as /relationships.jsonld and /relationships.txt.
function knowledgeGraph(): Plugin {
  return {
    name: 'knowledge-graph',
    transformIndexHtml(html) {
      return html.replace('<!-- kg:head -->', buildHeadHtml());
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'relationships.jsonld', source: JSON.stringify(buildJsonLd(), null, 2) + '\n' });
      this.emitFile({ type: 'asset', fileName: 'relationships.txt', source: buildText() });
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
