<template>

    <h1>Hello World</h1>

    <h1>{{ $t('hello', { name: 'vue-i18n' }) }}</h1>

    <InternationalizationLanguageSwitcher />

    <button @click="about">About page</button>
</template>

<script setup>

    function about(){
        navigateTo('about')
    }
</script>