import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: { // 👈 このブロックを追加しました
    chunkSizeWarningLimit: 1000
  }
  
})
