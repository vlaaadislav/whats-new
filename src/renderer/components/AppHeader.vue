<template>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group">
                <button class="btn btn-default">
                    <span class="icon icon-home"></span>
                </button>
                <button @click="selectDirectory" class="btn btn-default">
                    <span class="icon icon-folder"></span>
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-cloud"></span>
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-popup"></span>
                </button>
                <button class="btn btn-default">
                    <span class="icon icon-shuffle"></span>
                </button>
            </div>

            <button class="btn btn-default">
                <span class="icon icon-home icon-text"></span>
                Filters
            </button>

            <button class="btn btn-default btn-dropdown pull-right">
                <span class="icon icon-megaphone"></span>
            </button>
        </div>
    </header>
</template>

<script>
    import fs from 'fs';
    import { remote } from 'electron';

    export default {
        name: 'AppHeader',

        methods: {
            selectDirectory() {
                remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, this.addNewDirectory);
            },
            addNewDirectory(path) {
                console.log(path);
            }
        }
    };
</script>

<style lang="scss">

</style>