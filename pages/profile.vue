<template>
    <h1>Hello you man!</h1>
</template>

<script setup>

definePageMeta({
    // layout: "sidebar",
    middleware: ["auth"]
})
</script>