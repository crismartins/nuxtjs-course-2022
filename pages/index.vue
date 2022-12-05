<template>

    <h1>Hello World</h1>

    <button @click="about">About page</button>
</template>

<script setup>

    function about(){
        navigateTo('about')
    }
</script>