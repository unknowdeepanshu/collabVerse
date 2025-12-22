import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
import path from 'path'
export default defineConfig({

  server: {
      proxy: {
        "/api": {
          // Use the variable from your .env file, or fallback to localhost
          target: import.meta.env.VITE_MORIA_WEB || "http://localhost:3000/",
          changeOrigin: true,
          secure: false,
        }
      }
    },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
