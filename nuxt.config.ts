// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
        app: {
            head: {
            charset: 'utf-16',
            viewport: 'width=500, initial-scale=1',
            title: 'My App',
            meta: [
                // <meta name="description" content="My amazing site">
                { name: 'description', content: 'My amazing site.' }
            ],
            }
        },
        css: ["~/assets/css/tailwind.css", "@/assets/scss/main.scss"],
        vite: {
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: '@import "@/assets/scss/variables.scss";',
                    }
                }
            }
        },
        postcss: {
            plugins: {
                tailwindcss: {},
                autoprefixer: {},
            },
        },
})
