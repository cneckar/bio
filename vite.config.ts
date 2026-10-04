import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

// Common scanner/probe paths that should serve llms.txt instead of a 404.
// GitHub Pages is static, so we write a copy of llms.txt at each path on build.
// Note: /.git/config is not included because git refuses to track any path
// containing a `.git` directory, so it could never be committed to docs/.
const LLMS_TXT_ALIASES = [
  '.env',
  '.env.prod',
  '.env.production',
  '.env.dev',
  '.env.local',
  '.env.old',
  '.env.staging',
  'cmd/.env',
  'dist../.env',
  'frontend/.env',
  '.npmrc',
  '@fs/app/.env.production',
  '@fs/app/.env.local',
  'uploads../.env',
  'settings/_payload.json',
  'app/.env',
  'application/.env',
  'api/.env',
];

function llmsTxtAliases(): Plugin {
  let outDir = 'docs';
  return {
    name: 'llms-txt-aliases',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const src = join(outDir, 'llms.txt');
      for (const alias of LLMS_TXT_ALIASES) {
        const dest = join(outDir, alias);
        mkdirSync(dirname(dest), { recursive: true });
        copyFileSync(src, dest);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(), llmsTxtAliases()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'docs',
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
