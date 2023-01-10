<template>
    <div>
        <h1>My Goals</h1>
        <div class="grid">
            <div class="item" :id="goal.title.replaceAll(' ','-').toLowerCase()" v-for="goal in goals" :key="goal.id">
                <header>
                    <AppIcon IconName="tabler:target-arrow"/>
                    <h2>
                        {{goal.title}}
                    </h2>
                    <time>{{ goal.published }}</time>
                </header>
                <div class="item-body">
                    <div class="deadline">
                        <span class="days-to-go">
                            {{ daysToGo(goal.deadline) }}
                        </span>
                        <small>days to go</small>
                        <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
                    
                    <button class="primary-btn">
                        Goal Achieved!
                    </button>
                </div>
                <div class="subgoals-wrapper" v-if="goal.subgoals.length !== 0">
                    <small @click="focusSubtask(subgoal)" v-for="subgoal in goal.subgoals" :key="subgoal.index">
                        <AppIcon IconName="tabler:target-arrow"/>
                        {{ subgoal }}
                    </small>
                </div>
                <picture v-if="goal.image">
                    <img :src="goal.image" :alt="goal.title">
                </picture>
            </div>
        </div>
        
    </div>
</template>
<script setup>
    const config = useRuntimeConfig();

    const {data} = useFetch(`${config.API_URL}/user/${route.params.id}/goals`);
    const goals = data.value;

    function daysToGo(deadline){
        let deadlineDate = new Date(deadline)
        let currentDate = new Date()
        let difference = deadlineDate.getTime() - currentDate.getTime();
        return deadline = Math.ceil(difference / (1000 * 3600 * 24));
    }
    

    function focusSubtask(subtask){
        subtask = subtask.replaceAll(' ','-').toLowerCase()
        let selector = document.getElementById(subtask)
        selector.classList.add("focused")
        setTimeout(function () {
            selector.classList.remove("focused")
        }, 2000)

        selector.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
    definePageMeta({
        layout: 'goals'
    })

</script>
<style lang="scss" scoped>
    h1{
        color: var(--primaryColorLighten);
    }
    .grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: $_20px;
        @media(max-width: $br-tablet){
            grid-template-columns: 1fr;

        }
        .item{
            background-color: var(--primaryColorLighten);
            padding: $_24px;
            position: relative;
            box-shadow: $small-box-shadow;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            &:hover{
                box-shadow: $large-box-shadow;
                transition: resize(1.2);
            }
            &.focused{
                border: 2px solid var(--featuredColor);
            }
            header{
                position: relative;
                z-index: 1;
                svg{
                    width: $_60px;
                    height: $_60px;
                    font-size: $_24px;
                    color: var(--featuredColor);
                    position: absolute;
                }
                h2{
                    margin: 0;
                }
                time{
                    font-size: $_12px;
                    right: 0;
                    padding: $_4px $_8px;
                    border-radius: $_12px;
                    // background-color: var(--secondaryColor);
                }
            }
            &-body{
                position: relative;
                z-index: 1;
                .deadline{
                    .days-to-go{
                        font-size: $_40px;
                        display: block;
                        text-align: center;
                    }
                    progress{
                        width: 100%;
                    }
                    small{
                        display: block;
                        text-align: center;
                    }
                }
                
            }
            .subgoals-wrapper{
                padding: $_8px 0;
                display: flex;
                grid-gap: $_8px;
                position: relative;
                z-index: 1;
                small{
                    display: inline-block;
                    padding: $_12px;
                    background-color: var(--secondaryColor);
                    border-radius: $_12px;
                    color: var(--contrastColor);
                }
            }
            picture{
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                width: 100%;
                height: 100%;
                opacity: 0.4;
                img{
                    width: 100%;
                    min-height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
</style>