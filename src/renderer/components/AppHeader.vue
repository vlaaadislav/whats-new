<template>
    <header class="toolbar toolbar-header">
        <div class="toolbar-actions">
            <div class="btn-group">
                <button @click="addNewGame" class="btn btn-default">
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

        <div class="modal" ref="modal">
            <form>
                <header class="toolbar toolbar-header" @mousedown="dragModal">
                    <h1 class="title">Add New Game</h1>
                </header>

                <main class="modal__content">
                    <div class="form-group">
                        <input type="email" class="form-control" placeholder="Name">
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
                        <button class="btn btn-default">
                            Cancel
                        </button>

                        <button class="btn btn-primary pull-right">
                            Save
                        </button>
                    </div>
                </footer>
            </form>
        </div>
    </header>
</template>

<script>
    import fs from 'fs'
    import { remote } from 'electron'

    export default {
        name: 'AppHeader',

        data() {
            return {
                directoryPath: ''
            }
        },

        methods: {
            addNewGame() {

            },
            selectDirectory() {
                remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, this.addNewDirectory)
            },
            addNewDirectory(path) {
                this.directoryPath = path
            },
            dragModal(event) {
                const modal = this.$refs.modal;

                const initX = modal.offsetLeft,
                    initY = modal.offsetTop,
                    mousePressX = event.clientX,
                    mousePressY = event.clientY

                modal.addEventListener('mousemove', repositionElement)

                window.addEventListener('mouseup', () => {
                    modal.removeEventListener('mousemove', repositionElement)
                })

                function repositionElement(event) {
                    this.style.left = initX + event.clientX - mousePressX + 'px';
                    this.style.top = initY + event.clientY - mousePressY + 'px';
                }
            }
        }
    }
</script>

<style lang="scss">
    .modal {
        position: fixed;
        z-index: 1;
        left: 33vw;
        top: 33vh;
        width: 33vw;
        border: 1px solid #bebebe;
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        border-radius: 6px;
        overflow: hidden;
        resize: horizontal;
        background-color: white;

        &__content {
            padding: 10px;
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