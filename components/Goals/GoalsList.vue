<template>
    <div class="grid">
        <div class="item" :class="{'achieved' : goal.achieved }" :id="goal.id"  v-for="goal in goals" :key="goal.id">
            <header>
                <div class="header-top">
                    <time>{{ moment(goal.updated_at).format("MMM Do YYYY") }}</time>
                    <div class="more-options">
                        <button @click="editGoal(goal.id, 'edit')">
                            <AppIcon IconName="fluent:edit-16-regular"/>
                        </button>
                        <button @click="deleteGoal(goal)">
                            <AppIcon IconName="fluent:delete-16-regular"/>
                        </button>
                    </div>
                </div>
                <h2>
                    {{goal.title}}
                </h2>
                
            </header>
            <div class="item-body">

                <div class="deadline">
                    <small>Expires</small>
                    <span class="days-to-go">
                        {{ moment(goal.deadline).endOf('hour').fromNow() }}
                    </span>
                </div>
                <picture>
                    <img v-if="goal.image" :src="goal.image" :alt="goal.title">
                    <AppIcon v-else IconName="tabler:target-arrow"/>
                </picture>
                <p class="goal-description">
                    {{goal.description}}
                </p>
                <div class="status" v-if="goal.subgoals.length">
                    <progress id="progress" :value="subgoalsAchievedAmount(goal.id)" max="100" />
                    <p>
                        <strong>
                            {{subgoalsAchievedAmount(goal.id)}}%
                        </strong> Achieved!
                    </p>
                </div>
                
                
            </div>
            <footer class="item-footer">
                <div class="subgoals-wrapper" v-if="goal.subgoals.length">
                    <h3>
                        Subgoals:
                    </h3>
                    <small @click="openSubgoals(goal)" v-for="subgoal in goal.subgoals" :key="subgoal.id" :class="{'achieved' : subgoal.done}">
                        <AppIcon v-if="subgoal.done" IconName="fluent:checkmark-12-filled"/>
                        <AppIcon v-else IconName="tabler:target-arrow"/>
                        {{ subgoal.title }}
                    </small>
                </div>
                <p v-if="goal.achieved">
                    Goal Achieved at {{moment(goal.achieved_at).format('MMMM Do YYYY')}}
                </p>
                <button @click="achievedGoal(goal.id)" class="secondary-btn" v-if="goal.achieved">
                    Mark as Unachieved
                </button>
                <button :disabled="goal.subgoals.length !== subgoalsAchieved(goal.id)" @click="achievedGoal(goal.id)" class="achieve-btn" v-else>
                    Mark as Achieved!
                </button>
            </footer>

            
        </div>
        <GoalsModal class="modal-container" v-if="subgoalsModal" modalTitle="Achieve Subgoals" @closeModal="closeSubgoals">
            <ul class="subgoals-wrapper">
                <li v-for="subgoal in selectedGoal.subgoals" :key="subgoal.id" :class="{'done' : subgoal.done}">
                    <label>
                        <AppIcon v-if="subgoal.done" IconName="fluent:checkmark-12-filled"/>
                        <AppIcon v-else IconName="tabler:target-arrow"/> {{ subgoal.title }}
                    </label>
                    <span class="switch" @click="achievedSubgoal(subgoal)">
                        <input type="checkbox" :checked="subgoal.done" :id="'check-'+subgoal.id">
                        <span class="slider"></span>
                    </span>
                </li>
            </ul>
        </GoalsModal>
        <GoalsModal class="modal-container" v-if="deleteGoalModal" modalTitle="Delete Goal" @closeModal="closeDeleteGoal">
            <p>
                You're trying to delete the <strong>{{ selectedGoal.title }}</strong> goal.
            </p>
            <p>
                Are you sure about that?
            </p>
            <footer class="modal-footer">
                <button @click="closeDeleteGoal" class="secondary-btn">
                    No, cancel
                </button>
                <button @click="confirmDeleteGoal(selectedGoal)" class="primary-btn">
                    Yes, delete
                </button>
            </footer>
        </GoalsModal>
    </div>
</template>
<script setup>
    import moment from 'moment';
    const config = useRuntimeConfig();
    const route = useRoute();

    const {data} = await useFetch(() => `${config.API_URL}/user/${route.params.id}/goals`);
    const goals = data.value.data;
    
    function editGoal(id, action){
        navigateTo(`/goals/goal-${id}-${action}`)
    }

    const subgoalsModal = ref(false)
    const deleteGoalModal = ref(false)
    
    const selectedGoal = ref(null)

    const subgoalsAchieved = computed(() => {
        return (id) => {
            const goal = goals.find(goal => goal.id == id)
            return goal.subgoals.filter(goal => goal.done == true).length
        }
    })

    const subgoalsAchievedAmount = computed(() => {
        return (id) => {
            const goal = goals.find(goal => goal.id == id)
            return Math.round(100 / goal.subgoals.length) * goal.subgoals.filter(goal => goal.done == true).length
        }
    })

    function openSubgoals(goal){
        selectedGoal.value = goal
        subgoalsModal.value = true
    }
    function closeSubgoals(){
        subgoalsModal.value = false
    }

    function deleteGoal(goal){
        selectedGoal.value = goal
        deleteGoalModal.value = true
    }
    function closeDeleteGoal(){
        deleteGoalModal.value = false
    }

    
    async function confirmDeleteGoal({id}){
        const {data} = await useFetch(() => `${config.API_URL}/goal/${id}/delete`, {
            method: 'DELETE',
        });
        window.location.reload();
    }
    
    async function achievedGoal(id){
        const {data} = await useFetch(() => `${config.API_URL}/goal/${id}/status`, {
            method: 'PUT',
        });
        window.location.reload();
    }
    
    async function achievedSubgoal(subgoal){
        const response = await useFetch(() => `${config.API_URL}/subgoal/${subgoal.id}/status`, {
            method: 'PUT',
        });
        if(response.data.value.success){
            goals = goals.map(goal => {
                if(goal.id === selectedGoal.value.id){
                    goal.subgoals = goal.subgoals.map(item => {
                        if(item.id === subgoal.id){
                            subgoal.done = !subgoal.done;
                        }
                        return item
                    })
                }
                return goal
            })
        }
    }
</script>
<style lang="scss" scoped>
.grid{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: $_20px;
    @media(max-width: $br-desktop){
        grid-template-columns: 1fr 1fr;
    }
    @media(max-width: $br-tablet){
        grid-template-columns: 1fr;
    }
    .item{
        background-color: var(--contrastColor);
        position: relative;
        border-radius: $_20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: $default-transition;
        max-width: 380px;
        cursor: pointer;
        &.achieved{
            background-color: var(--featuredColor);
        }
        &.unachieved{
            background-color: var(--primaryColorLighten);
        }
        &:hover,&.focused{
            box-shadow: $large-box-shadow;
            transform: scale(1.2);
            z-index: 2;
        }
        header{
            position: relative;
            padding: $_12px $_24px;
            z-index: 1;
            .header-top{
                display: flex;
                justify-content: space-between;
                align-items: center;
                time{
                    font-size: $_12px;
                    right: 0;
                    padding: $_4px 0;
                    border-radius: $_12px;
                }
                .more-options{
                    display: flex;
                    button{
                        padding: $_4px $_8px;
                        font-size: $_20px;
                        color: var(--textColorLighten);
                        cursor: pointer;
                        &:hover{
                            color: var(--primaryColor);
                        }
                    }
                }
            }
            h2{
                margin: 0;
            }
            .goal-description{
                font-size: $_12px;
            }
        }
        &-body{
            position: relative;
            padding: $_12px $_24px;
            .deadline{
                display: flex;
                flex-direction: column;
                text-align: center;
                margin: $_8px 0;
                small{
                    color: var(--textColorLighten);
                    text-transform: uppercase;
                }
                span{
                    font-size: $_20px;
                    font-weight: 600;
                }
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
                border: $_4px solid var(--primaryColorLighten);
                background-color: var(--contrastColor);
                img{
                    width: 100%;
                    min-height: 100%;
                    object-fit: cover;
                }
                svg{
                    font-size: $_64px;
                    color: var(--primaryColor);
                }
            }
            .goal-description{
                font-size: $_14px;
                text-align: center;
                margin: $_8px 0;
            }
            .status{
                padding: $_8px 0;
                progress{
                    width: 100%;
                }
                p{
                    font-size: $_14px;
                    margin: 0;
                    display: flex;
                    justify-content: space-between;
                }
            }
            
        }
        &-footer{
            padding: $_12px $_24px;
            .subgoals-wrapper{
                padding: 0 0 $_12px 0;
                display: flex;
                grid-gap: $_8px;
                // overflow: auto;
                flex-wrap: wrap;
                h3{
                    margin: 0;
                   width: 100%;
                }
                small{
                    display: inline-block;
                    font-size: $_12px;
                    padding: $_8px $_12px;
                    background-color: var(--primaryColorLighten);
                    border-radius: $_20px;
                    color: var(--primaryColor);
                    font-weight: 600;
                    flex-shrink: 0;
                    &.achieved{
                        background-color: var(--featuredColor);
                        color: var(--textColor);
                    }
                }
            }
            position: relative;
            z-index: 1;
            p{
                font-size: $_12px;
                color: var(--textColorLighten);
                text-align: center;
                font-weight: 600;
            }
            button{
                width: 100%;
                margin: $_12px 0;
            }
        }
    }

    .subgoals-wrapper{
        li{
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: $_8px;
            transition: $default-transition;
            &:hover{
                background-color: var(--primaryColorLighten);
            }
            label{
                padding: $_12px $_12px;
                font-weight: 600;
                font-size: $_16px;
                flex-grow: 1;
                cursor: pointer;
                svg{
                    color: var(--primaryColor);
                    font-size: $_24px;
                }
            }
            .switch{
                margin: $_8px $_12px;
            }
            &.done{
                label{
                    svg{
                        color: var(--featuredColor);
                    }
                }
            }
        }
    }
    .modal-container{
        p{
            text-align: center;
        }
        .modal-footer{
            margin-top: $_24px;
            padding-top: $_20px;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid var(--primaryColorLighten)
        }
    }
}
</style>