import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dsv from '@rollup/plugin-dsv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dsv({
      processRow: (row, id) => {
        Object.keys(row).forEach((key) => {
          var value = row[key];
          row[key] = isNaN(+value) ? (value === '...' ? NaN : value) : +value;
        });
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
