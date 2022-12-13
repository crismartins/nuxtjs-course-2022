<template>
    <form class="language-switcher">
        <label for="en" :class="$i18n.locale == 'en' ? 'active' : ''">
            <span>
                <English />
            </span>
            <input v-model="$i18n.locale" type="radio" id="en" name="language" value="en">
        </label>
        <label for="es" :class="$i18n.locale == 'es' ? 'active' : ''">
            <span>
                <Spanish />
            </span>
            <input v-model="$i18n.locale" type="radio" id="es" name="language" value="es">
        </label>
    </form>
</template>

<script setup>
import { Icon } from '#components'

const English = h(Icon, { name: 'circle-flags:us' })
const Spanish = h(Icon, { name: 'circle-flags:es' })
</script>

<style lang="scss">
.language-switcher{
    display: flex;
    align-items: center;
    position: relative;
    label{
        cursor: pointer;
        margin: $_16px $_8px;
        font-size: $_16px;
        transition: $default-transition;
        filter: grayscale(1);
        &.active{
            filter: grayscale(0);
        }
        &:hover{
            transform: scale(1.4);
            filter: grayscale(0);
        }
        span{
            text-transform: uppercase;
            font-weight: bold;
            font-size: $_20px;
            display: flex;
            align-items: center;
        }
        input{
            display: none;
        }
    }
}
</style>