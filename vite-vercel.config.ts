import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2015'
    }
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})

