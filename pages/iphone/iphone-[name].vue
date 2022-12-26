<template>
    <div>
        <!-- <img :src="`/images/iphone-${route.params.name}.jpg`" alt=""> -->
        <h2 class="text-3xl font-bold">iPhone {{name}}</h2>
        <button @click="addToCart" class="p-3 bg-indigo-900 text-white rounded-md mt-5">
            <span v-if="isInCart()">
                Remove From Cart
            </span>
            <span v-else>
                Buy Now
            </span>
        </button>
    </div>
</template>

<script setup>
const route = useRoute();

const name = computed(() => {
    return route.params.name.replaceAll("-"," ");
});

const fullName = computed(() => {
    return `iphone-${route.params.name}`;
});

const cart = useCart();

function isInCart(){
    return !!cart.value.find((ct) => ct.name === fullName.value);
};

function addToCart(){
    if (!isInCart()){
        cart.value.push({name: fullName});
        console.log(cart.value)
    }
    else{
        cart.value = cart.value.filter(ct => ct.name !== fullName.value);
    }
    
}

useHead({
    title: `Nuxt3 - ${route.params.name}`,
});
</script>