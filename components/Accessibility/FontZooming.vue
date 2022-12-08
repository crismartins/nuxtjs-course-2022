<template>
    <div class="font-zooming">
        <div class="size-selector" @click="fontSizeZoom(0)">A<small>100%</small></div>
        <div class="size-selector" @click="fontSizeZoom(50)">A+<small>150%</small></div>
        <div class="size-selector" @click="fontSizeZoom(100)">A++<small>200%</small></div>
    </div>
</template>

<script setup>

    function fontSizeZoom(value){
        if(value == 0){
            transition();
            document.documentElement.setAttribute('font-zooming', 'normal');
        }else if(value == 50){
            transition();
            document.documentElement.setAttribute('font-zooming', 'fifith');
        }else if(value == 100){
            transition();
            document.documentElement.setAttribute('font-zooming', 'oneHundred');
        }
    }

    let transition = () => {
        document.documentElement.classList.toggle('transition');
    }
</script>

<style lang="scss">
    
    html[font-zooming='normal'] {
        --fontZooming: 100%;
        --alignHorizon: 0;
    }
    html[font-zooming='fifith'] {
        --fontZooming: 150%;
        --alignHorizon: 1;
    }
    html[font-zooming='oneHundred'] {
        --fontZooming: 200%;
        --alignHorizon: 2;
    }
    html{
        font-size: var(--fontZooming);
    }
    .font-zooming{
        --selectorSize: 40px;
        &:before{
            left: calc(var(--alignHorizon) * var(--selectorSize));
        }
    }

    //selector
    .font-zooming{
        width: fit-content;
        display: flex;
        position: relative;
        margin: $_16px 0;
        &:before{
            content:'';
            position: absolute;
            border-radius: $_20px;;
            background: $primary-color;
            border: 1px solid $light-grey;
            bottom: - 8px;
            height: 20px;
            width: 20px;
            transition: $default-transition;
            box-shadow: $small-box-shadow;
            z-index: 2;
            margin:0 calc(var(--selectorSize) - 30px);
        }
        &:after{
            content:'';
            position: absolute;
            border-radius: $_20px;;
            background-color: $light-grey;
            bottom: 0;
            height: 2px;
            width: 100%;
            z-index: 0;
        }
        .size-selector{
            width: var(--selectorSize);
            height: var(--selectorSize);
            padding: $_8px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 1;
            cursor: pointer;
            &:after{
                position: absolute;
                content: '';
                display: block;
                width: 2px;
                height: 12px;
                background-color:$light-grey;
                bottom: -5px;
                z-index: -1;
            }
            small{
                width: fit-content;
                font-size: $_12px;
                opacity: 0;
                top: 100%;
                position: absolute;
                transition: $default-transition;
                background-color:$dark-color;
                color: white;
                padding: $_4px;
                border-radius: $_4px;
                box-shadow: $small-box-shadow;
                &:before{
                    content:'';
                    background-color: $dark-color;
                    position: absolute;
                    z-index: -1;
                    top: - $_4px;
                    width: $_8px;
                    height: $_8px;
                    left: calc(50% - $_4px);
                    transform: rotate(45deg);
                    border-radius: 2px 0;
                }
            }
            &:hover{
                small{
                    opacity: 1;
                    top:120%;
                }
            }
        }
    }
</style>