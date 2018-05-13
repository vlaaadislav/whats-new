<template>
    <div class="main-page">
        <div class="tabs-component">
            <ul class="tabs-component-tabs">
                <li
                    v-for="(game, index) in ['Old Images', 'New Images']"
                    class="tabs-component-tab"
                    :class="{ 'is-active': index === selectedTab }"
                >
                    <a class="tabs-component-tab-a" @click="changeTab(index)">{{ game }}</a>
                </li>
            </ul>

            <div class="tabs-component-panels" ref="scroll">
                <images-view v-if="selectedTab === 0" :key="0" :images="images"/>
                <images-view v-if="selectedTab === 1" :key="1" :images="newImages"/>
            </div>
        </div>
    </div>
</template>

<script>
    import ImagesView from './ImagesView'
    import { mapGetters } from 'vuex'

    export default {
        name: 'main-page',

        components: {
            ImagesView
        },

        data() {
            return {
                selectedTab: 0
            }
        },

        computed: {
            ...mapGetters([
                'gameData',
                'images',
                'newImages'
            ])
        },

        watch: {
            $route() {
                this.changeTab(0)
                this.fetchGameData()
            }
        },

        created() {
            this.fetchGameData()
        },

        methods: {
            changeTab(index) {
                this.$refs.scroll.scrollTop = 0
                this.selectedTab = index
            },

            fetchGameData() {
                this.$store.dispatch('fetchGameData', this.$route.params.game)
            }
        }
    }
</script>

<style lang="scss">
    .main-page {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        table {
            margin-top: -10px;
        }

        tr:nth-child(even).new {
            background-color: rgba(52, 200, 74, 0.5)
        }

        tr:nth-child(odd).new {
            background-color: rgba(52, 200, 74, 0.2)
        }
    }
</style>
