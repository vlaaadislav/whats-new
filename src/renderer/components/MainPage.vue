<template>
    <div class="main-page">
        <gallery :images="images" :index="imageIndex" @close="index = null"/>

        <div class="images">
            <div
                    v-for="(image, index) in images"
                    :key="index"
                    class="image-wrapper"
                    @click="imageIndex = index">
                <img v-lazy="image"/>
            </div>
        </div>
    </div>
</template>

<script>
    import VueGallery from 'vue-gallery/dist/js/vue-gallery'

    export default {
        name: 'main-page',

        components: {
            'gallery': VueGallery,
        },

        data() {
            return {
                gameData: {},
                imageIndex: null
            }
        },

        computed: {
            images() {
                return this.gameData.files
            }
        },

        watch: {
            '$route': 'fetchGameData'
        },

        methods: {
            async fetchGameData() {
                this.gameData = {}
                this.gameData = await this.$store.getters.gameData(this.$route.path.substr(1))
            }
        }
    }
</script>

<style lang="scss">
    .main-page {
        overflow-y: auto;

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
