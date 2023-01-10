<template>
    <div class="loading-content">
        <div class="loading-animation">
            <AppIcon IconName="eos-icons:hourglass"/>
            <strong>Loading</strong>
        </div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
    .loading-content{
        background-color: rgba(255,255,255,0.8);
        position: fixed;
        width: 100vw;
        height: 100vh;
        display: grid;
        place-items: center;
        top: 0;
        left: 0;
        z-index: 999;
        .loading-animation{
            display: flex;
            flex-direction: column;
            align-items: center;
            svg{
                font-size: $_60px;
                color: var(--primaryColor);
            }
            strong{
                color: var(--primaryColor);
                padding: $_20px 0;
            }
        }
    }
</style>