<template>
    <div class="main-page">
        <tabs @changed="changeTab" :cache-lifetime="0">
            <tab name="Old Images">
                <gallery
                    id="old"
                    :images="images"
                    :index="imageIndex"
                    @close="imageIndex = null"
                />

                <div
                    class="images"
                    v-infinite-scroll="loadMoreImages"
                    infinite-scroll-disabled="payload.loading"
                >
                    <div
                        v-for="(image, index) in images.slice(0, payload.imagesQty - 1)"
                        :key="index"
                        class="image-wrapper"
                        @click="imageIndex = index"
                    >
                        <img :src="image"/>
                    </div>
                </div>
            </tab>

            <tab name="New Images">
                <gallery
                    id="new"
                    :images="newImages"
                    :index="newImageIndex"
                    @close="newImageIndex = null"
                />

                <div
                    class="images"
                    v-infinite-scroll="loadMoreNewImages"
                    infinite-scroll-disabled="payload.loading"
                >
                    <div
                        v-for="(image, index) in newImages.slice(0, payload.newImagesQty - 1)"
                        :key="index"
                        class="image-wrapper"
                        @click="newImageIndex = index"
                    >
                        <img v-lazy="image"/>
                    </div>
                </div>
            </tab>
        </tabs>
    </div>
</template>

<script>
    import VueGallery from 'vue-gallery/dist/js/vue-gallery'
    import { Tabs, Tab } from 'vue-tabs-component'
    import { mapGetters } from 'vuex'
    import path from 'path'
    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        name: 'main-page',

        components: {
            'gallery': VueGallery,
            Tabs,
            Tab
        },

        directives: {
            infiniteScroll
        },

        data() {
            return {
                imageIndex: null,
                newImageIndex: null,
                allImageIndex: null,
                payload: {
                    loading: false,
                    imagesQty: 10,
                    newImagesQty: 10,
                    addImagesQty: 10
                }
            }
        },

        computed: {
            ...mapGetters([
                'gameData',
                'images',
                'newImages'
            ]),
            allImages() {
                if (this.images.length === this.newImages.length === 0) {
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
            },
            loadMoreImages(field = 'imagesQty') {
                this.$set(this.payload, 'loading', true)
                this.$set(
                    this.payload,
                    field,
                    this.payload[field] + this.payload.addImagesQty
                )
                this.$set(this.payload, 'loading', false)
            },
            loadMoreNewImages() {
                this.loadMoreImages('newImagesQty')
            },
            changeTab(arg) {
                console.log(arg)
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
            box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
            border-radius: 2px;
            overflow: hidden;
            transition: ease-out .5s;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            will-change: transform;

            &:hover {
                box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
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
