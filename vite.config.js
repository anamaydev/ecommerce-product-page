import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';


// https://vite.dev/config/
export default defineConfig({
  base: '/ecommerce-product-page/',
  plugins: [
    svgr(),
    react(),
    tailwindcss(),
  ],
})
