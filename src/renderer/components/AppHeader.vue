<template>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group">
                <button @click="$modal.show('add-directory')" class="btn btn-default">
                    <i class="icon icon-list-add"></i>
                </button>

                <button @click="dropTable" class="btn btn-default">
                    <i class="icon icon-trash"></i>
                </button>

                <button @click="consoleAllData" class="btn btn-default">
                    <i class="icon icon-publish"></i>
                </button>
            </div>
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
    import { remote } from 'electron'

    export default {
        name: 'AppHeader',

        data() {
            return {
                directoryPath: [],
                isModalVisible: false
            }
        },

        methods: {
            selectDirectory() {
                remote.dialog.showOpenDialog({
                    properties: ['openFile', 'openDirectory', 'multiSelections']
                }, path => this.directoryPath = path)
            },
            addNewDirectory(event) {
                const name = event.target.elements['gameName'].value
                this.$store.dispatch('insert', { name, path: this.directoryPath })
                this.$modal.hide('add-directory')
            },
            modalClose() {
                this.directoryPath = []
                this.$refs.modalForm.reset()
            },
            dropTable() {
                this.$store.dispatch('drop')
            },
            async consoleAllData() {
                console.log(await this.$store.getters.all)
            }
        }
    }
</script>

<style lang="scss">
    header {
        height: 30px;
    }

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