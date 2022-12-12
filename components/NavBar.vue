<template>
    <nav class="bg-purple-900 shadow-lg p-3 text-white text-lg flex justify-between">
        <div class="flex">
            <nuxt-link class="ml-4" to="/">Home</nuxt-link>
            <nuxt-link class="ml-4" to="/about">About</nuxt-link>
            <nuxt-link class="ml-4" to="/iphone">Iphones</nuxt-link>
            <p class="ml-4">Cart ({{cart.length}})</p>
            <p class="ml-4">Total Route Changed: {{pageVisitCount}}</p>
        </div>
        <div v-if="auth.isAuthenticated">
            <nuxt-link to="/profile">Profile</nuxt-link>
            <button class="ml-4" @click="logout">Logout</button>
        </div>
        <nuxt-link v-else to="/login">Login</nuxt-link>

        <AccessibilityFontZooming />
        <AccessibilityThemeSwitcher />
    </nav>
</template>

<script setup>
    const cart = useCart();

    const auth = useAuth();

    const pageVisitCount = usePageVisitCount();

    function logout() {
        auth.value.isAuthenticated = false;
        // navigateTo("/login");
    }

    console.log(cart.value.length);
</script>