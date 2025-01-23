// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true, // เปิดใช้งาน Server-Side Rendering
  build: {
    transpile: [],
  },
  nitro: {
    preset: 'node-server', // ตั้งค่าการใช้งานเป็น Node.js server
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
