<template>
    <MyIcon/>
</template>

<script setup>
import { Icon } from '#components'
import { toRefs, h } from 'vue'

const props = defineProps({
    IconName: {
        type: String,
        required: true
    }
})

const { IconName } = toRefs(props)

const MyIcon = h(Icon, {name : IconName.value})
</script>

<style lang="scss" scoped>

</style>