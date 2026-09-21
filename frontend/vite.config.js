import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Las llamadas a /api se redirigen al backend Express en desarrollo.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
