import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to ensure /admin route works as a direct static file fallback
const adminRoutePlugin = () => ({
  name: 'admin-route-plugin',
  closeBundle() {
    const distDir = path.resolve(__dirname, 'dist');
    const adminDir = path.resolve(distDir, 'admin');
    const indexPath = path.resolve(distDir, 'index.html');
    const adminIndexPath = path.resolve(adminDir, 'index.html');

    if (fs.existsSync(indexPath)) {
      if (!fs.existsSync(adminDir)) {
        fs.mkdirSync(adminDir, { recursive: true });
      }
      fs.copyFileSync(indexPath, adminIndexPath);
    }
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), adminRoutePlugin()],
})
