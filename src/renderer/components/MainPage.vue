<template>
    <div class="main-page">
        <tabs>
            <tab name="Old Images">
                <gallery id="old"
                         :images="images"
                         :index="imageIndex"
                         @close="imageIndex = null"/>

                <div class="images">
                    <div
                            v-for="(image, index) in images"
                            :key="index"
                            class="image-wrapper"
                            @click="imageIndex = index">
                        <img v-lazy="image"/>
                    </div>
                </div>
            </tab>

            <tab name="New Images">
                <gallery id="new"
                         :images="newImages"
                         :index="newImageIndex"
                         @close="newImageIndex = null"/>

                <div class="images">
                    <div
                            v-for="(image, index) in newImages"
                            :key="index"
                            class="image-wrapper"
                            @click="newImageIndex = index">
                        <img v-lazy="image"/>
                    </div>
                </div>
            </tab>

            <tab name="All Images">
                all images
            </tab>
        </tabs>
    </div>
</template>

<script>
    import VueGallery from 'vue-gallery/dist/js/vue-gallery'
    import { Tabs, Tab } from 'vue-tabs-component';
    import { mapGetters } from 'vuex'

    export default {
        name: 'main-page',

        components: {
            'gallery': VueGallery,
            Tabs,
            Tab
        },

        data() {
            return {
                imageIndex: null,
                newImageIndex: null
            }
        },

        computed: {
            ...mapGetters([
                'gameData'
            ]),

            images() {
                return this.gameData.files
            },
            newImages() {
                return this.gameData.newFiles
            }
        },

        watch: {
            '$route': 'fetchGameData'
        },

        methods: {
            fetchGameData() {
                this.$store.dispatch('fetchGameData', this.$route.path.substr(1))
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

        .images {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .image-wrapper {
            height: 200px;
            width: 250px;
            margin: 5px;
            box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.08);
            border-radius: 2px;
            overflow: hidden;
            transition: ease-out .5s;
            transform: translate3d(0,0,0);
            backface-visibility: hidden;
            will-change: transform;

            &:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
                transform: scale(1.1);
            }
        }

        img {
            image-rendering: crisp-edges;
            height: 100%;
            width: 100%;
        }
    }
</style>
