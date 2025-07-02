import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';




// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  const baseURL = env.VITE_BACKEND_URL;
  const frontEndURL = env.VITE_FRONTEND_URL;
  console.log(frontEndURL);
  console.log(baseURL);



  return {
    plugins: [react(), tailwindcss()],
      server: {
    proxy: {
      
      '/api': {
        target: baseURL,
        changeOrigin: true,
        
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: false,
    origin: frontEndURL,
    
  }

  }
}) 


 // plugins: [tailwindcss(), react()],
  // server: {
  //   proxy: {
      
  //     '/api': {
  //       target: baseURL,
  //       changeOrigin: true,
        
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  //   cors: true
    
  // }

//});
