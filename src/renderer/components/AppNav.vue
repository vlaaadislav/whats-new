<template>
    <nav class="nav-group pane pane-sm sidebar">
        <h5 class="nav-group-title">Games</h5>
        <router-link
                v-for="game in $store.getters.games"
                :key="game"
                :to="game"
                class="nav-group-item">
            {{ game }}
        </router-link>
    </nav>
</template>

<script>
    export default {
        name: 'AppNav'
    }
</script>

<style lang="scss">

</style>