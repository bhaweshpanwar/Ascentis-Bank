import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // Proxy all requests starting with "/AscentisBank"
//       '/AscentisBank': {
//         target: 'https://ghoul-causal-adder.ngrok-free.app',
//         changeOrigin: true, // Ensures the origin header matches the target
//         secure: false, // Disable SSL validation for self-signed certificates
//         rewrite: (path) => path, // Keep the path as it is
//       },
//     },
//   },
// });
