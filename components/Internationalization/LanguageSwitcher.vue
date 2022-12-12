<template>
    <form class="language-switcher">
        <label for="en" :class="$i18n.locale == 'en' ? 'active' : ''">
            <span>
                en
            </span>
            <input v-model="$i18n.locale" type="radio" id="en" name="language" value="en">
        </label>
        <label for="fr" :class="$i18n.locale == 'fr' ? 'active' : ''">
            <span>
                fr
            </span>
            <input v-model="$i18n.locale" type="radio" id="fr" name="language" value="fr">
        </label>
        <label for="ja" :class="$i18n.locale == 'ja' ? 'active' : ''">
            <span>
                ja
            </span>
            <input v-model="$i18n.locale" type="radio" id="ja" name="language" value="ja">
        </label>
    </form>
</template>

<style lang="scss">
.language-switcher{
    display: flex;
    position: relative;
    align-items: center;
    label{
        cursor: pointer;
        margin: $_4px;
        padding: $_4px;
        font-size: $_16px;
        background-color: gray;
        border-radius: $_12px;
        transition: $default-transition;
        &.active{
            color: red;
            transform: scale(1.2);
        }
        &:hover{
            transform: scale(1.4);
        }
        span{
            text-transform: uppercase;
            font-weight: bold;
        }
        input{
            display: none;
        }
    }
}
</style>