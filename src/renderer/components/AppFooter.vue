<template>
    <footer class="toolbar toolbar-footer">
        <div class="toolbar-actions">
            <button class="btn btn-default" @click="$router.push({ path: '/' })">
                Cancel
            </button>

            <button class="btn btn-primary pull-right">
                Update Game Files
            </button>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'AppFooter'
    }
</script>

<style lang="scss">
    footer {
        height: 30px;
    }
</style>