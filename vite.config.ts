import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import checker from 'vite-plugin-checker'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    checker({
      vueTsc: {
        tsconfigPath: './tsconfig.app.json',
      },
      overlay: {
        initialIsOpen: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/styles/variables" as *;
          @use "@/assets/styles/mixins" as *;
        `,
      },
    },
  },
})
