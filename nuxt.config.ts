
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
        modules: ['nuxt-icon'],
        app: {
            head: {
                charset: 'UTF-8',
                viewport: 'width=device-width, initial-scale=1.0',
                title: 'My App',
                meta: [
                    // <meta name="description" content="My amazing site">
                    { name: 'description', content: 'My amazing site.' }
                ],
            },
            pageTransition: { name: 'page', mode: 'out-in' },
            layoutTransition: { name: 'layout', mode: 'out-in' }
        },
        css: ["@/assets/scss/main.scss"],
        vite: {
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: '@import "@/assets/scss/variables.scss"; @import "@/assets/scss/mixins.scss";',
                    }
                }
            },
            plugins: [
                VueI18nVitePlugin({
                    include: [
                        resolve(dirname(fileURLToPath(import.meta.url)), './locales/*.json')
                    ]
                }),
            ]
        },
        // postcss: {
        //     plugins: {
        //         tailwindcss: {},
        //         autoprefixer: {},
        //     },
        // },
})
