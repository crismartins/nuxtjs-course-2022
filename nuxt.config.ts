// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
        app: {
            head: {
            charset: 'UTF-8',
            viewport: 'width=device-width, initial-scale=1.0',
            title: 'My App',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'My amazing site.' }
            ],
            }
        },
        css: ["@/assets/scss/main.scss"],
        vite: {
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: '@import "@/assets/scss/variables.scss"; @import "@/assets/scss/mixins.scss";',
                    }
                }
            }
        },
        // postcss: {
        //     plugins: {
        //         tailwindcss: {},
        //         autoprefixer: {},
        //     },
        // },
})
