<template>
    <div class="overlay">
        <div class="modal">
            <header class="modal-header">
                <h2>
                    <span>{{modalTitle}}</span>
                    
                    <AppIcon @click="closeModal" IconName="fluent:dismiss-16-filled"/>
                    
                </h2>
            </header>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script setup>

    const props = defineProps({
        modalTitle: String,
        openCloseModal: Boolean,
    })
    const emit = defineEmits([
        'closeModal'
    ])

    function closeModal(){
        emit('closeModal')
    }
</script>
<style lang="scss" scoped>
    .overlay{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: $_20px;
        z-index: 8;
        display: grid;
        place-items: center;
        backdrop-filter: blur(100%);
        &:before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--textColor);
            opacity: 0.4;
            backdrop-filter: blur(100%);
        }
        .modal{
            background-color: var(--contrastColor);
            position: relative;
            width: 100%;
            max-width: 600px;
            border-radius: $_20px;
            &-header{
                padding: $_24px $_24px 0;
                h2{
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin: 0;
                    padding-bottom: $_20px;
                    border-bottom: 1px solid var(--primaryColorLighten);
                    svg{
                        cursor: pointer;
                        opacity: 0.4;
                        &:hover{
                            opacity: 1;
                        }
                    }
                }
            }
            &-body{
                padding: $_12px $_24px $_24px;
            }
        }
    }
</style>