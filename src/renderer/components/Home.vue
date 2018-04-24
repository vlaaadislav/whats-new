<template>
    <div class="landing-page">
        <app-header/>
        <main class="content">
            <app-nav/>
        </main>
        <app-footer/>
    </div>
</template>

<script>
    import AppHeader from './AppHeader';
    import AppFooter from './AppFooter';
    import AppNav from './AppNav';

    export default {
        name: 'landing-page',
        components: {
            AppFooter,
            AppHeader,
            AppNav
        }
    };
</script>

<style lang="scss">
    .landing-page {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .content {
        display: flex;
        flex-grow: 1;
    }
</style>
