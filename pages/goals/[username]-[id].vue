<template>
    <div>
        <h1>My Goals</h1>
            
        <GoalsList />
        
    </div>
</template>
<script setup>
    
    definePageMeta({
        layout: 'goals'
    })

</script>
<style lang="scss">
    h1{
        color: var(--primaryColorLighten);
    }
</style>