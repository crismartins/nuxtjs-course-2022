<template>
    <div class="subgoals-wrap">
        <form class="goal-form" @submit.prevent="onAddSubGoal">
            <label for="">Sub Goals to achieve the Main Goal:</label>
            <div v-if="response">
                <p class="response">{{response}}</p>
            </div>
            <small v-for="selected in selectedSubgoals" :key="selected">
                {{selected.id}} {{ selected.title }} <span @click="removeSubgoal(selected.id)">x</span>
            </small>
            <div class="input-add">
                <input type="text" @focus="openDropdown" v-model="subgoal" placeholder="Add subgoals..." />
                <button class="primary-btn"><AppIcon IconName="fluent:add-12-filled"/></button>
            </div>
        </form>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const subgoal = ref('')

const props = defineProps(['subgoals', 'goalId'])

const selectedSubgoals = ref(props.subgoals)

const form = reactive({
    goal_id: props.goalId,
    title: subgoal
})

async function onAddSubGoal(){
    const {data, error} = await useFetch(`${config.API_URL}/goal/create/subgoal`, {
        method: 'POST',
        body: form,
    })
    if(error.value){
        response.value = error.value.data.message;
        return;
    }
    window.location.reload();
}


function openDropdown(){
    searchResults.value = true
}

function filteredList() {
  return subgoals.filter((fruit) =>
    fruit.toLowerCase().includes(search.value.toLowerCase())
  );
}
// function addSubgoal(value){
//     selectedSubgoals.value.push(value)
// }
async function removeSubgoal(id){
    // selectedSubgoals.value.pop(value)
    const {data} = await useFetch(`${config.API_URL}/subgoal/${id}/delete`, {
        method: 'DELETE',
    });
    window.location.reload();
}
</script>

<style lang="scss" scoped>
    .subgoals-wrap{
        label{
            font-size: $_12px;
            display: block;
            font-weight: 600;
            color: var(--textColorLighten);
            padding: $_4px 0;
        }
        small{
            background-color: var(--primaryColorLighten);
            margin: $_4px;
            padding: $_4px $_12px;
            border-radius: $_20px;
            display: inline-block;
            color: var(--primaryColor);
        }
        .input-add{
            position: relative;
            button{
                width: $_28px;
                height: $_28px;
                padding: 0;
                position: absolute;
                top: 0;
                right: 0;
                margin: $_8px;
                font-size: $_16px;
                display: grid;
                place-items: center;
            }
        }
    }
</style>