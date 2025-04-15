import { defineConfig } from 'vite'

export default defineConfig({
  base: '/lab2-ar/', // ← додали правильний base!
  build: {
    outDir: 'docs'
  }
})
