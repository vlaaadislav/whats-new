<template>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group">
                <button @click="$modal.show('add-directory')" class="btn btn-default">
                    <i class="icon icon-list-add"></i>
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

        <modal
                name="add-directory"
                adaptive
                draggable
                :width="300"
                height="auto"
                @before-close="modalClose">
            <form ref="modalForm" @submit.prevent="addNewDirectory">
                <header class="toolbar toolbar-header">
                    <h1 class="title">Add New Game</h1>
                </header>

                <main class="modal-content">
                    <div class="form-group">
                        <input
                                type="text"
                                class="form-control"
                                placeholder="Name"
                                required
                                name="gameName">
                    </div>

                    <div class="form-group">
                        <div ref="directoryInput" class="form-control directory" tabindex="0">
                            <input
                                    @focus="$refs.directoryInput.focus()"
                                    :placeholder="directoryPath || 'Directory'"
                                    type="text">
                            <i @click="selectDirectory" class="icon icon-folder"></i>
                        </div>
                    </div>
                </main>

                <footer class="toolbar toolbar-footer">
                    <div class="toolbar-actions">
                        <button class="btn btn-default" @click="$modal.hide('add-directory')">
                            Cancel
                        </button>

                        <button class="btn btn-primary pull-right" type="submit">
                            Save
                        </button>
                    </div>
                </footer>
            </form>
        </modal>
    </header>
</template>

<script>
    import fs from 'fs'
    import { remote } from 'electron'

    export default {
        name: 'AppHeader',

        data() {
            return {
                directoryPath: '',
                isModalVisible: false
            }
        },

        methods: {
            selectDirectory() {
                remote.dialog.showOpenDialog({
                    properties: ['openDirectory']
                }, path => this.directoryPath = path[0])
            },
            addNewDirectory(event) {
                const name = event.target.elements['gameName'].value

                this.$store.dispatch('insert', { name, path: this.directoryPath })

                this.modalClose()
            },
            modalClose() {
                this.directoryPath = ''
                this.$refs.modalForm.reset()
            }
        }
    }
</script>

<style lang="scss">
    .modal-content {
        padding: 10px;
        .form-group:last-child {
            margin-bottom: 0;
        }
    }

    .directory {
        display: flex;

        i {
            align-self: center;
            justify-content: flex-end;
        }

        input {
            border: none;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;

            &:focus {
                outline: none;
            }
        }
    }
</style>