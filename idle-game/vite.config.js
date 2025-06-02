import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/idle-game/', // 👈 This is required for GitHub Pages
  plugins: [react()],
})

