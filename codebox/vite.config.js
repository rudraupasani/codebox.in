import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          codemirror: ["@codemirror/lang-html", "@codemirror/theme-one-dark"],
          sandpack: ["@codesandbox/sandpack-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // moved inside build
  },
})
