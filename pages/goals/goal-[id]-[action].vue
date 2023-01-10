<template>
    <div>
        <h1>{{route.params.action == 'new' ? 'New Goal' : 'Edit Goal'}}</h1>
        <div class="goal-form">
            <form @submit.prevent="onAddEditGoal(route.params.action)">
                <div v-if="response">
                    <p class="response">{{response}}</p>
                </div>
                <div class="input-wrap">
                    <label for="">Title</label>
                    <input v-model="form.title" type="text" placeholder="Goal Title..."  />
                </div>
                <div class="description-wrap">
                    <label for="">Short Description</label>
                    <textarea v-model="form.description" placeholder="Goal Description..."></textarea>
                </div>
                <div class="input-wrap image-url">
                    <label for="">Image URL</label>
                    <input v-model="form.image" placeholder="Image URL..." type="search" />
                </div>
                <div class="input-wrap">
                    <label for="">Deadline date</label>
                    <Datepicker date-picker v-model="form.deadline" />
                </div>

                
                <button class="primary-btn">
                    Add Goal
                </button>
            </form>
            <div class="preview">
                <div class="goal-preview">
                    <h2>
                        {{ form.title }}
                    </h2>
                    <picture>
                        <img :src="form.image" alt="" />
                    </picture>
                    <p>
                        {{ form.description }}
                    </p>
                </div>
                <GoalsAddSubgoals v-if="route.params.action == 'edit'" :subgoals="singleGoal.subgoals" :goalId="goalId" />
            </div>
        </div>
    </div>
</template>

<script setup>

import {ref} from "vue"

import moment from 'moment';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const config = useRuntimeConfig();
const route = useRoute();

const action = route.params.action;

const userId = ref(route.params.id)
const goalId = ref(route.params.id)

const newGoalUrl = `${config.API_URL}/goal/create`;
const editGoalUrl = `${config.API_URL}/goal/${goalId.value}/update`;


const {data} = await useFetch(`${config.API_URL}/goal/${goalId.value}`);
const singleGoal = data.value.data;

const form = reactive( action == "new" ? {
        user_id: userId.value,
        title: '',
        description:'',
        deadline:'',
        image:'',
    } : {
        title: singleGoal.title,
        description: singleGoal.description,
        deadline: moment(singleGoal.deadline).format("MM-DD-YYYY"),
        image: singleGoal.image,
})

const response = ref(null)

async function onAddEditGoal(action){
    if(action == 'new'){
        const {data, error} = await useFetch(newGoalUrl, {
            method: 'POST',
            body: form,
        });
        if(error.value){
            response.value = error.value.data.message;
            return;
        }
    }
    if(action == 'edit'){
        const {data, error} = await useFetch(editGoalUrl, {
            method: 'PUT',
            body: form,
        });
        if(error.value){
            response.value = error.value.data.message;
            return;
        }
    }
    
    navigateTo(`/goals/user-${userId.value}`)
}

definePageMeta({
    layout: 'goals'
})
</script>

<style lang="scss" scoped>
    .goal-form{
        background-color: var(--contrastColor);
        padding: $_20px;
        border-radius: $_20px;
        display: grid;
        grid-gap:$_20px;
        grid-template-columns: 1fr 1fr;
        form{
            .input-wrap,.description-wrap{
                padding: $_4px 0;
                label{
                    font-size: $_12px;
                    display: block;
                    font-weight: 600;
                    color: var(--textColorLighten);
                    padding: $_4px 0;
                }
            }
            button{
                margin-top: $_16px;
            }
        }
    }
    .goal-preview{
        background-color: var(--primaryColorLighten);
        padding:$_20px $_24px;
        margin: $_12px 0;
        border-radius: $_12px;
        text-align: center;
        h2{
            margin: 0;
        }
        picture{
            width: $_80px;
            height: $_80px;
            border-radius: $_80px;
            text-align: center;
            overflow: hidden;
            display:grid;
            place-items: center;
            margin: $_8px auto;
            border: $_4px solid var(--contrastColor);
            background-color: var(--contrastColor);
            img{
                width: 100%;
                min-height: 100%;
                object-fit: cover;
            }
        }
    }
</style>