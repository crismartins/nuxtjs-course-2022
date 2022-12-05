<template>
    <form @submit.prevent="onSubmit">

        <div v-if="_error">
            <p class="bg-red-600 text-red-200 text-sm p-3 mb-5">{{_error}}</p>
        </div>
        <div>
            <input v-model="form.email" class="border" type="text" placeholder="email">
        </div>
        <div>
            <input v-model="form.password" class="border" type="password" placeholder="password">
        </div>
        <button class="bg-purple-700 p-4 text-white">
            <span v-if="isLoading">
                Loading...
            </span>
            <span v-else>
                Sign in
            </span>
        </button>
    </form>
</template>

<script setup>
// definePageMeta({
//     layout: 'sidebar'
// })

const url = "https://reqres.in/api/login";

const isLoading = ref(false);

const _error = ref(null);

const form = reactive({
    email: 'eve.holt@reqres.in', 
    password:'cityslicka',
})

async function onSubmit() {
    if (isLoading.value) return;

    isLoading.value = true;
    const {data, error} = await useFetch(url, {
        method: 'POST',
        body: form,
    });

    isLoading.value = false;
    if(error.value){
        _error.value = error.value.data.error;
        return;
    }
    const auth = useAuth();

    auth.value.isAuthenticated = true
    navigateTo('/')
}
</script>