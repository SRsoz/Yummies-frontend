import { register } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signIn: resolve(__dirname, 'signIn.html'),
        register: resolve(__dirname, 'register.html'),
        yourRecipes: resolve(__dirname, 'yourRecipes.html'),
        createRecipe: resolve(__dirname, 'createRecipe.html'),
        yourAccount: resolve(__dirname, 'yourAccount.html'),
        updateRecipe: resolve(__dirname, 'updateRecipe.html')
      },
    },
  },
});