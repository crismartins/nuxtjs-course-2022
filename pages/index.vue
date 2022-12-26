<template>
    <div>
        <!-- <nav>
            <a href="#" @click="view('home')">Home</a>
            <a href="#" @click="view('counter')">Counter</a>
        </nav> -->
        <h1>Hello World</h1>
    
        <h1>{{ $t('hello', { name: 'Cris' }) }}</h1>
    
        <button @click="about">About page</button>
    
        <!-- <LazyHomeWelcome v-if="page == 'home'" />
        <LazyCounter v-if="page == 'counter'" /> -->
    </div>
</template>

<script setup>
    // const page = ref("home");

    // function view(name){
    //     page.value = name;
    // }
    function about(){
        navigateTo('about')
    }
</script>