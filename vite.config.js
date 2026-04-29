import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    globals: true,
  },

  build: {
    // Raise warning threshold — vendor chunk is intentionally larger
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        /**
         * Manual chunk splitting:
         *  - "vendor"  → react + react-dom  (cached long-term, rarely changes)
         *  - "router"  → react-router-dom   (smaller, separate cache bucket)
         *
         * This moves ~85 KiB of framework code out of the main app bundle,
         * making the entry chunk smaller and reducing "unused JS" on first load.
         */
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
            return 'vendor'
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router/')) {
            return 'router'
          }
        },
      },
    },
  },
})
