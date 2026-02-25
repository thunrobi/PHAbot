import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      stream: 'stream-browserify', 
    },
  },
});
// Måste köra npm install --save-dev node-polyfill-webpack-plugin
//Måste köra npm install stream-browserify
//Sedan för att builden inte fungerade, körde npm update och sedan npm build. 