<template>
    <label for="themeSwitcher" class="theme-switcher-wrapper">
        <div class="light">
            <LightIcon />
        </div>
        <div class="dark">
            <DarkIcon />
        </div>
        <input id="themeSwitcher" @click="switchTheme" class="theme-switcher" type="checkbox">
    </label>
</template>

<script setup>

    import { Icon } from '#components'

    const LightIcon = h(Icon, { name: 'mdi:white-balance-sunny' })
    const DarkIcon = h(Icon, { name: 'mdi:weather-night' })

    function switchTheme(){
        if(document.querySelector('#themeSwitcher').checked){
            transition();
            document.documentElement.setAttribute('data-theme', 'dark');
        }else{
            transition();
            document.documentElement.setAttribute('data-theme', '');
        }
    }

    let transition = () => {
        document.documentElement.classList.toggle('transition');
    }
</script>

<style lang="scss">
.theme-switcher-wrapper{
    display: flex;
    width: fit-content;
    background-color: $light-grey;
    cursor: pointer;
    border-radius: $_32px;
    position: relative;
    border: 4px solid $light-grey;
    margin: $_16px 0;
    &::before{
        content: '';
        position: absolute;
        width: 50%;
        height: 100%;
        background-color: var(--lightBg);
        border-radius: $_32px;
        z-index: 0;
        right: 50%;
        transition: $default-transition;
    }
    div{
        font-size: $_16px;
        padding: $_4px;
        width: 50%;
        position: relative;
        z-index: 1;
        transition: $default-transition;
        display: flex;
        align-items: center;
        justify-content: center;
        &.light{
            opacity: 1;
        }
        &.dark{
            opacity: 0.4;
        }
    }
    .theme-switcher{
        display: none;
    }
}

//dark theme
html[data-theme='dark'] {
    .theme-switcher-wrapper{
        &::before{
            right: 0;
        }
        div{
            &.light{
                opacity: 0.4;
            }
            &.dark{
                opacity: 1;
            }
        }
    }
    --lightBtn: #FFBD07;
    --lightBg: #232323;
    --lightColor: #fff;
}
</style>