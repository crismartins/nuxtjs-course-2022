<template>
    <div class="login-page" :class="newUser ? 'register' : 'login'">

        <div class="form-block">
            <div class="switch-links" @click="switchLogin">
                <span v-if="newUser">
                    Go to Login
                </span>
                <span v-else>
                    Are you new here? Sign Up
                </span>
            </div>
            <form v-if="newUser" @submit.prevent="onRegisterSubmit">
                <h1>
                    Sign Up <AppIcon IconName="fluent:add-circle-24-regular"/>
                </h1>
                <div v-if="response">
                    <p class="response">{{response}}</p>
                </div>
                <div class="input-wrapper">
                    <input v-model="form.username" class="border" type="text" placeholder="username">
                </div>
                
                <div class="input-wrapper input-password">
                    <input v-model="form.password" v-on:keyup="isValidPassword(form.password)" class="border" :type="passwordVisible ? 'text' : 'password'" placeholder="password">
                    <span @click="showPassword">
                        <AppIcon v-if="passwordVisible" IconName="fluent:eye-off-16-regular"/>
                        <AppIcon v-else IconName="fluent:eye-show-16-regular"/>
                    </span>
                </div>
                <div class="password-validation" :class="{alert : InvalidAlert}">
                    <p>
                        <span v-if="InvalidAlert">Don't forget!</span> 
                        Your Password must contain:
                    </p>
                    <ul>
                        <li>
                            <small :class="{valid : isMin}">
                                at least 8 characters
                            </small>
                        </li>
                        <li>
                            <small :class="{valid : hasNumber}">
                                at least 1 Number
                            </small>
                        </li>
                        <li>
                            <small :class="{valid : hasCapital}">
                                at least 1 Capital letter
                            </small>
                        </li>
                    </ul>
                </div>
                <button class="primary-btn">
                    <span v-if="isLoading">
                        Loading...
                    </span>
                    <span v-else>
                        Create account
                    </span>
                </button>
            </form>
            <form v-else @submit.prevent="onLoginSubmit">
                <h1>
                    Sign In <AppIcon IconName="fluent:arrow-enter-20-filled"/>
                </h1>
                <div v-if="response">
                    <p class="response">{{response}}</p>
                </div>
                <div class="input-wrapper">
                    <input v-model="form.username" class="border" type="text" placeholder="username">
                </div>
                <div class="input-wrapper input-password">
                    <input v-model="form.password" class="border" :type="passwordVisible ? 'text' : 'password'" placeholder="password">
                    <span @click="showPassword">
                        <AppIcon v-if="passwordVisible" IconName="fluent:eye-off-16-regular"/>
                        <AppIcon v-else IconName="fluent:eye-show-16-regular"/>
                    </span>
                </div>
                <button class="primary-btn">
                    <span v-if="isLoading">
                        Loading...
                    </span>
                    <span v-else>
                        Enter
                    </span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'clean'
})

let newUser = ref(false)
let passwordVisible = ref(false)
let InvalidAlert = ref(false)

const registerUrl = "http://10.0.8.149:8000/register";
const loginUrl = "http://10.0.8.149:8000/login";

const isLoading = ref(false);

const isMin = ref(false);
const hasNumber = ref(false);
const hasCapital = ref(false);

function isValidPassword(password){
    if(password.length >= 8){
        isMin.value = true
    }else{
        isMin.value = false
    }

    if(password.match(/\d/)){
        hasNumber.value = true
    }else{
        hasNumber.value = false
    }

    if(password.match(/[A-Z]/)){
        hasCapital.value = true
    }else{
        hasCapital.value = false
    }
}

const response = ref(null);

const form = reactive({
    username: 'Test', 
    password: 'Test1234',
})

function switchLogin(){
    newUser.value = !newUser.value
}
function showPassword(){
    passwordVisible.value = !passwordVisible.value
}

async function onRegisterSubmit() {
    
    if (isLoading.value) return;
    
    if (isMin.value && hasCapital.value && hasNumber.value){
        const {data, error} = await useFetch(registerUrl, {
            method: 'POST',
            body: form,
        });
        if(error.value){
            response.value = error.value.data.message;
            return;
        }else{
            response.value = 'All right! Now you can sign in:'
        }

        newUser.value = false
    }
    else{
        InvalidAlert.value = true
    }


}

async function onLoginSubmit() {
    if (isLoading.value) return;

    isLoading.value = true;
    const {data, error} = await useFetch(loginUrl, {
        method: 'POST',
        body: JSON.stringify(form),
    });

    isLoading.value = false;
    if(error.value){
        response.value = error.value.data.message;
        return;
    }
    const auth = useAuth();

    auth.value.isAuthenticated = true
    const userId = data.value.data.id;
    const userName = data.value.data.username;
    navigateTo(`/goals/${userName}-${userId}`)
}

</script>

<style lang="scss" scoped>
.login-page{
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: var(--primaryColor);
    .form-block{
        width: 100%;
        max-width: 300px;
        .switch-links{
            span{
                color: var(--contrastColor);
                cursor: pointer;
                padding: $_8px 0;
                font-size: $_14px;
                display: inline-block;
            }
        }
        h1{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0;
        }
        .password-validation{
            color: var(--contrastColor);
            border: 2px solid transparent;
            &.alert{
                border-color: red;
                span{
                    color: red;
                    display: block;
                }
            }
            .valid{
                text-decoration: line-through;
            }
        }
        .input-wrapper{
            margin: $_12px 0;
            &.input-password{
                position: relative;
                span{
                    cursor: pointer;
                    position: absolute;
                    top:0;
                    right: 0;
                    padding: $_8px $_12px;
                    height: 100%;
                }
            }
        }
        button{
            width: 100%;
        }
    }
}
</style>