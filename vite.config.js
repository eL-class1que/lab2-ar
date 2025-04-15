import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lab2-ar/', // забезпечує правильний шлях на GitHub Pages
  build: {
    outDir: 'docs', // виводимо на docs, щоб GitHub Pages міг використовувати ці файли
  },
});
