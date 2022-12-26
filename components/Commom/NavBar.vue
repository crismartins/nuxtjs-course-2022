<template>
    <nav class="navigation">
        <div class="items-list">
            <nuxt-link class="item" to="/">Home</nuxt-link>
            <nuxt-link class="item" to="/about">About</nuxt-link>
            <nuxt-link class="item" to="/iphone">Iphones</nuxt-link>
            <span class="item">Cart ({{cart.length}})</span>
            <span class="item">Total Route Changed: {{pageVisitCount}}</span>
        </div>
        <div class="items-list" v-if="auth.isAuthenticated">
            <nuxt-link class="item" to="/profile">Profile</nuxt-link>
            <button class="item" @click="logout">Logout</button>
        </div>
        <nuxt-link v-else to="/login">Login</nuxt-link>
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

<style lang="scss">
    .navigation{
        display: flex;
        align-items: center;
        .items-list{
            display: flex;
            .item{
                padding: $_4px;;
            }
        }
    }
</style>