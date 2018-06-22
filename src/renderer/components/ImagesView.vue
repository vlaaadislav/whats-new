<template>
    <section class="tabs-component-panel">
        <gallery
            id="images"
            :images="images"
            :index="imageIndex"
            @close="imageIndex = null"
        />

        <recycle-list
            class="scroller"
            :items="imagesRows"
            :item-height="imageHeight"
        >
            <div slot-scope="{ item }" class="images">
                <div
                    v-for="image in item"
                    :key="image.id"
                    class="image-wrapper"
                    @click="imageIndex = image.id"
                >
                    <img v-lazy="image.path"/>
                </div>
            </div>
        </recycle-list>
    </section>
</template>

<script>
    import VueGallery from 'vue-gallery/dist/js/vue-gallery.min'
    import { RecycleList } from 'vue-virtual-scroller'

    export default {
        name: 'ImagesView',

        components: {
            gallery: VueGallery,
            RecycleList
        },

        props: {
            images: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                imageIndex: null,
                containerWidth: null,
                imageWidth: 260,
                imageHeight: 210
            }
        },

        computed: {
            imagesItems() {
                return this.images.map((item, index) => ({ path: item, id: index }))
            },

            imagesRows() {
                let imagesPerRow = this.containerWidth / this.imageWidth
                imagesPerRow = imagesPerRow >= 1 ? Math.floor(imagesPerRow) : 1
                const getLastItem = (array) => array[array.length - 1]

                return this.imagesItems.reduce((acc, item) => {
                    let lastRow = getLastItem(acc)
                    if (lastRow.length === imagesPerRow) {
                        lastRow = []
                        acc.push(lastRow)
                    }
                    lastRow.push(item)
                    return acc
                }, [ [] ])
            }
        },

        mounted() {
            window.addEventListener('resize', this.setContainerWidth)
            this.setContainerWidth()
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.setContainerWidth)
        },

        methods: {
            setContainerWidth() {
                this.containerWidth = this.$el.clientWidth - 20
            }
        }
    }
</script>

<style lang="scss">
    @import "~vue-virtual-scroller/dist/vue-virtual-scroller.css";

    .wrapper {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

    .scroller {
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }

    .images {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        img {
            image-rendering: crisp-edges;
            height: 100%;
            width: 100%;
        }
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
</style>