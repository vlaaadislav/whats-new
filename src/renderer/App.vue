<template>
    <div id="app">
        <app-header />
        <main class="content">
            <app-nav />
            <router-view />
        </main>
        <app-footer/>
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader'
    import AppFooter from './components/AppFooter'
    import AppNav from './components/AppNav'

    export default {
        name: 'whats-new',

        components: {
            AppFooter,
            AppHeader,
            AppNav
        }
    }
</script>

<style lang="scss">
    @import "../../static/css/photon.min.css";

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html {
        font-size: 100%;
    }

    #app {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;

        .toolbar {
            min-height: 30px;
        }
    }

    .content {
        display: flex;
        flex-grow: 1;
    }
</style>
