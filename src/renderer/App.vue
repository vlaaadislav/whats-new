<template>
    <div id="app">
        <app-header/>
        <main class="content">
            <app-nav/>
            <router-view/>
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
    @import '~photonkit/dist/css/photon.css';

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

    .tabs-component {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .tabs-component-tabs {
        margin: -1px 0 0 0;
        display: flex;
        border-top: 1px solid #989698;
        border-bottom: 1px solid #989698;
        list-style: none;
        padding: 0;
        min-height: 30px;
    }

    .tabs-component-tab {
        flex: 1;
        border-left: 1px solid #989698;
        transition: opacity .3s linear;
        background-color: #b8b6b8;
        opacity: 0.8;

        &:first-child {
            border-left: 0;
        }

        &.is-active {
            background-color: #d4d2d4;
        }

        &:hover:not(.is-active) {
            opacity: 1;
        }
    }

    .tabs-component-tab-a {
        font-size: 14px;
        font-weight: bold;
        color: inherit;
        text-decoration: none;
        display: flex;
        padding: 3px;
        justify-content: center;
    }

    .tabs-component-panels {
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 10px 0;
    }
</style>
