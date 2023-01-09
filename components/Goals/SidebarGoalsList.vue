<template>
    <nav class="goals-menu">
        <ul>
            <li v-for="goal in goals" :key="goal.id">
                <span @click="focusGoal(goal.id)">
                    <picture v-if="goal.image">
                        <img :src="goal.image" :alt="goal.title">
                    </picture>
                    <span class="icon" v-else>
                        <AppIcon IconName="tabler:target-arrow"/>
                    </span>
                    {{goal.title}}
                </span>
            </li>
        </ul>
    </nav>
</template>
<script setup>
    const config = useRuntimeConfig();

    const route = useRoute();
    // const props = defineProps({
    //     userId: String,
    // })

    const userId = route.params.id

    const {data} = await useFetch(() => `${config.API_URL}/user/${userId}/goals`);
    const goals = data.value.data;

    function focusGoal(id){
        let selector = document.getElementById(id)
        selector.classList.add("focused")
        setTimeout(function () {
            selector.classList.remove("focused")
        }, 2000)
        selector.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

</script>
<style lang="scss" scoped>
    .goals-menu{
        ul{
            list-style: none;
            padding: 0;
            li{
                margin: $_4px $_20px;
                span{
                    display: flex;
                    align-items: center;
                    padding: $_8px;
                    font-size: $_14px;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: $_12px;
                    color: var(--textColor);
                    cursor: pointer;
                    span,picture{
                        display: block;
                        width: $_40px;
                        height: $_40px;
                        border-radius: $_8px;
                        margin-right: $_12px;
                        border: 2px solid transparent;
                    }
                    picture{
                        overflow: hidden;
                        box-shadow: $small-box-shadow;
                        img{
                            width: 100%;
                            min-height: 100%;
                            object-fit: cover;
                        }
                    }
                    span{
                        display: grid;
                        place-items: center;
                        font-size: $_20px;
                        color: var(--primaryColor);
                        background-color: var(--primaryColorLighten);
                    }
                    &:hover{
                        color: var(--secondaryColor);
                    }
                    &.router-link-active{
                        background-color: var(--primaryColorLighten);
                        color: var(--primaryColor);
                        span,picture{
                            border-color: var(--contrastColor);
                            color: var(--featuredColor);
                            background-color: var(--featuredColorLighten);
                        }
                    }
                }
            }
        }
    }
</style>