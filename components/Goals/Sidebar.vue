<template>
    <div class="sidebar-content">
        <div class="sidebar-body">
            <header>
                <picture class="avatar">
                    <img :src="user.avatar" :alt="user.name">
                </picture>
                <h3>Hey {{user.name}}!</h3>
                <p>Let's check your Goals</p>
            </header>
            <div class="add-goals-btn">
                <button class="primary-btn" @click="addGoal(user.id, 'new')">
                    <AppIcon IconName="fluent:add-12-filled"/> Add Goal
                </button>
            </div>

            <SidebarGoalsList />
            
        </div>
        <footer>
            <small>
                Developed by Somebody
            </small>
        </footer>
    </div>
</template>

<script setup>
    import SidebarGoalsList from './SidebarGoalsList.vue';

    const route = useRoute();

    const user = {
        id: route.params.id,
        name: route.params.username,
        avatar: 'https://i.pinimg.com/originals/a4/4a/f3/a44af3bb5f074e3cdb4be8a56232c996.jpg',
    }
    // https://picsum.photos/200

    async function addGoal(id, action){
        navigateTo(`/goals/goal-${id}-${action}`)
    }

</script>

<style lang="scss" scoped>
    .sidebar-content{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media (max-width: $br-tablet){
            height: auto;
        }
        .sidebar-body{
            header{
                padding: $_20px;
                .avatar{
                    display: block;
                    overflow: hidden;
                    width: $_60px;
                    height: $_60px;
                    border-radius: $_60px;
                    img{
                        width: 100%;
                        min-height: 100%;
                        object-fit: cover;
                    }
                }
                h3{
                    font-size: $_20px;
                    margin-bottom: $_4px;
                }
                p{
                    margin: 0;
                    color: var(--textColorLighten);
                }
            }
            .add-goals-btn{
                padding: $_20px;
                button{
                    width: 100%;
                }
            }
        }
        footer{
            padding: $_20px;
            small{
                font-size: $_12px;
                color: var(--textColorLighten);
            }
        }
    }
</style>