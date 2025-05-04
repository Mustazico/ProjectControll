import dotenv from 'dotenv'
dotenv.config();

console.log('TOKEN_SECRET:', process.env.TOKEN_SECRET);
console.log('TOKEN_EXPIRATION:', process.env.TOKEN_EXPIRATION);

export default defineNuxtConfig({
  runtimeConfig: {
    dbServer: process.env.NUXT_DB_SERVER,
    dbUser: process.env.NUXT_DB_USER,
    dbPass: process.env.NUXT_DB_PASS,
    dbName: process.env.NUXT_DB_NAME,
    dbPort: process.env.NUXT_DB_PORT,
    dbEncrypt: process.env.NUXT_DB_ENCRYPT,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: process.env.TOKEN_EXPIRATION,
    use_Mock_DB: process.env.NUXT_USE_MOCK_DB,
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/test-utils/module'
  ],

  devtools: { enabled: true },
  compatibilityDate: '2024-10-21',
})
