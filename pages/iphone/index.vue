<template>
    <div class="grid grid-cols-4 gap-4 mt-10">
        <nuxt-link v-for="iphone in iphones" 
        :key="iphone" 
        :to="`/iphone/${iphone}`" 
        class="iphone-box">
            <h2>{{iphone}}</h2>
            <div class="flex justify-center">
                <img width="200" src="/images/iphone.jpg" alt="iphone">
            </div>
        </nuxt-link>
    </div>
</template>

<script setup>
    useHead({
        title: "Nuxt3 - Iphones"
    });

    // const iphones = [
    //     "iphone-12",
    //     "iphone-12-pro",
    //     "iphone-13",
    //     "iphone-13-pro",
    // ]

    const {data} = useFetch("/api/iphones");
    const iphones = data.value;
</script>

<style lang="scss">
.iphone-box{
    @include card-style;
}
</style>