<template>
    <nav class="nav-group pane pane-sm sidebar">
        <h5 class="nav-group-title">Games</h5>
        <router-link
            v-for="game in $store.getters.games"
            :key="game"
            :to="game"
            class="nav-group-item link"
        >
            <span class="text">{{ game }}</span>
            <i @click.stop.prevent="updateDirectory(game)" class="icon icon-search"></i>
            <i @click.stop.prevent="removeGame(game)" class="icon icon-cancel"></i>
        </router-link>
    </nav>
</template>

<script>
    import { remote } from 'electron'

    export default {
        name: 'AppNav',

        methods: {
            updateDirectory(name) {
                remote.dialog.showOpenDialog({
                    properties: ['openDirectory', 'multiSelections']
                }, path => this.$store.dispatch('update', { name, path: path }))
            },
            removeGame(name) {
                this.$store.dispatch('remove', { name })
            }
        }
    }
</script>

<style lang="scss">
    .link {
        display: flex;
        transition: background-color .5s linear;

        .text {
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.nav-group-item {
            padding: 2px 2px 2px 5px;
        }

        &:hover {
            i.icon {
                opacity: 1;
            }
        }

        i.icon {
            align-self: center;
            font-size: 14px;
            height: 100%;
            margin: 0;
            opacity: 0;
            transition: opacity .2s linear, background-color .2s linear;
            flex-shrink: 0;

            &:hover {
                background-color: rgba(0, 0, 0, 0.08);
            }
        }
    }
</style>