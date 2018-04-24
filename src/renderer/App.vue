<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'whats-new'
    };
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
    }
</style>
