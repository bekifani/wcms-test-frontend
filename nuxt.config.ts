import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      title: 'Wine Management Table - Frontend Test',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Frontend test project for wine management table' }
      ]
    }
  },
  
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [{ path: '~/components/', pathPrefix: false }],
  
  modules: ['@nuxt/icon'],

  icon: {
    serverBundle: {
      collections: ['circle-flags']
    }
  },
})
