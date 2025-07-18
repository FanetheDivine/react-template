import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import fsRouter from './vite-fs-router-plugin/index.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), fsRouter()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
