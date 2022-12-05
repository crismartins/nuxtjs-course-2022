<template>
    <h1>Hello you!</h1>
</template>

<script setup>

definePageMeta({
    // layout: "sidebar",
    middleware: ["auth"]
})
</script>