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
                <gallery id="all"
                         :images="allImages"
                         :index="allImageIndex"
                         @close="allImageIndex = null"/>

                <table class="table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Path</th>
                            <th>Format</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                                v-for="(file, index) in allImages"
                                :class="{ new: newImages.length > index }"
                                @dblclick="allImageIndex = index">
                            <td>{{ getFilename(file) }}</td>
                            <td>{{ file }}</td>
                            <td>{{ getFilename(file).split('.')[1] }}</td>
                        </tr>
                    </tbody>
                </table>
            </tab>
        </tabs>
    </div>
</template>

<script>
    import VueGallery from 'vue-gallery/dist/js/vue-gallery'
    import { Tabs, Tab } from 'vue-tabs-component'
    import { mapGetters } from 'vuex'
    import path from 'path'

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
                newImageIndex: null,
                allImageIndex: null
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
            },
            allImages() {
                if (!this.images || !this.newImages) {
                    return []
                }
                return this.newImages.concat(this.images)
            }
        },

        watch: {
            '$route': 'fetchGameData'
        },

        methods: {
            fetchGameData() {
                this.$store.dispatch('fetchGameData', this.$route.path.substr(1))
            },
            getFilename(filepath) {
                return path.basename(filepath)
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
