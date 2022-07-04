import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcss from './postcss.config.js';
import { fileURLToPath, URL } from 'url';
/*import { readFileSync } from 'fs';
import { join } from 'path';

const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ''
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

const certificateName = process.env.npm_package_name

const certFilePath = join(baseFolder, `${certificateName}.pem`);
const keyFilePath = join(baseFolder, `${certificateName}.key`);
*/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    css: {
        postcss
    },
    build: {
        outDir: 'wwwroot'
    },

    base: '/',
    server: {
      hmr: {
        protocol: 'ws'
      },
      proxy: {
        '/hub': { 
            target: 'https://localhost:7205',
            //changeOrigin: true,
            secure: false,
            ws: true
            //ws: true 
          }
      }
    }
    /*resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },*/
      /*
      server: {
          hmr: false,
          clientPort: 7205,
        https: false,
        strictPort: true,
        proxy: {
          '/hub': { 
              target: 'ws://localhost:7205',
              changeOrigin: true,
              secure: false,
              ws: true 
            }
        }
      }Ü*/
})