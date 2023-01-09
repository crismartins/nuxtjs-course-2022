<template>
    <div class="goals-container">
        <aside>
            <GoalsSidebar />
        </aside>
        <main>
            <slot></slot>
        </main>
    </div>
</template>
<style lang="scss">
    .goals-container{
        position: fixed;
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: 280px auto;
        @media (max-width: $br-tablet){
            position: relative;
            height: auto;
            grid-template-columns: 1fr;
        }
        aside{
            position: relative;
            z-index: 2;
            background-color: var(--contrastColor);
            box-shadow: $large-box-shadow;
        }
        main{
            position: relative;
            padding: $_20px $_40px;
            overflow: auto;
            background-color: var(--primaryColor);
            // &:before{
            //     content: '';
            //     background-color: var(--primaryColor);
            //     position: fixed;
            //     height: 20vh;
            //     width: 100%;
            //     top: 0;
            //     left: 0;
            //     z-index: -1;
            // }
        }
    }
</style>