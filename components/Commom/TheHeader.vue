<template>
    <header class="the-header">
        <h1 class="logo-wrapper">
            {{ $t('logoName') }}
        </h1>
        <nav class="accessibility-nav">
            <AccessibilityFontZooming />
            <AccessibilityThemeSwitcher />
            <InternationalizationLanguageSwitcher />
        </nav>
    </header>
</template>

<style lang="scss">
    .the-header {
        display: flex;
        justify-content: space-between;
        padding: $_16px;
        .logo-wrapper{
            font-size: $_20px;
        }
        .accessibility-nav{
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: $_16px;
        }
    }
</style>