<template>
    <section class="tabs-component-panel">
        <gallery
            id="images"
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
                v-for="(image, index) in images.slice(0, imagesQty - 1)"
                :key="index"
                class="image-wrapper"
                @click="imageIndex = index"
            >
                <img v-lazy="image"/>
            </div>
        </div>
    </section>
</template>

<script>
    import VueGallery from 'vue-gallery/dist/js/vue-gallery.min'
    import infiniteScroll from 'vue-infinite-scroll'

    export default {
        name: 'ImagesView',

        components: {
            gallery: VueGallery
        },

        directives: {
            infiniteScroll
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
                imagesQty: 20,
                loading: false,
                perLoad: 20
            }
        },

        methods: {
            loadMoreImages() {
                this.loading = true
                this.imagesQty += this.perLoad
                this.loading = false
            }
        }
    }
</script>

<style lang="scss">
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