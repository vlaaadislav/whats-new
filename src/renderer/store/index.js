import Vue from 'vue'
import Vuex from 'vuex'
import db from '../datastore'
import fs from 'fs'
import path from 'path'
import differenceWith from 'lodash.differencewith'
import pullAllWidth from 'lodash.pullallwith'

Vue.use(Vuex)

function getFilesInDir(dirpath, ext) {
    return fs.readdirSync(dirpath).reduce((acc, file) => {
        file = path.join(dirpath, file)
        if (ext.includes(path.extname(file))) {
            return acc.push({
                path: file,
                name: path.basename(file),
                date: new Date(),
                size:  (fs.statSync(file).size / (1024*1024)).toFixed(2)
            }), acc
        }
        return fs.statSync(file).isDirectory() ? acc.concat(getFilesInDir(file, ext)) : acc
    }, [])
}

const store = new Vuex.Store({
    strict: false,

    state: {
        db,
        extensions: [
            '.png',
            '.jpg',
            '.jpeg',
            '.gif',
            '.img',
            '.webp'
        ],
        games: [],
        gameData: {}
    },

    getters: {
        db: (state) => state.db,
        ext: (state) => state.extensions,
        all: async (state) => await state.db.find({ }),
        games: (state) => state.games,
        gameData: (state) => state.gameData,
        images: (state, getters) => {
            if (!getters.gameData.files || getters.gameData.files.length === 0) {
                return []
            }
            return getters.gameData.files.map(image => image.path)
        },
        newImages: (state, getters) => {
            if (!getters.gameData.newFiles || getters.gameData.newFiles.length === 0) {
                return []
            }
            return getters.gameData.newFiles.map(image => image.path)
        },
    },

    actions: {
        async insert({ getters, dispatch }, { name, path }) {
            let files = []

            for (let p of path) {
                files = files.concat(await getFilesInDir(p, getters.ext))
            }

            if (await getters.db.findOne({ name })) {
                throw new Error('Game already exists')
            }

            await getters.db.insert({
                name,
                path,
                files,
                newFiles: []
            })

            await dispatch('updateGames')
        },

        async drop({ getters, dispatch }) {
            await getters.db.remove({ }, { multi: true })
            await dispatch('updateGames')
        },

        async remove({ getters, dispatch }, { name }) {
            await getters.db.remove({ name }, { })
            await dispatch('updateGames')
        },

        async update({ getters, dispatch }, { name, path }) {
            const newFiles = await getFilesInDir(path, getters.ext)
            const oldFiles = (await getters.db.find({ name }, { files: 1 }))[0].files

            const uniqFiles = differenceWith(newFiles, oldFiles, (newImg, oldImg) => {
                if (newImg.name === oldImg.name && newImg.size === oldImg.size) {
                    oldImg.path = newImg.path
                    return true
                }
                return false
            })

            console.log(oldFiles)

            await getters.db.update({ name }, { $set: { newFiles: uniqFiles, files: oldFiles }}, {})
            dispatch('fetchGameData', name)
        },

        async updateGames({ getters, commit }) {
            commit('setGames', (await getters.db.find({ }, { name: 1 })).map(item => item.name))
        },

        async fetchGameData({ getters, commit }, name) {
            commit('setGameData', (await getters.db.findOne({ name })))
        },

        async updateGameFiles({ getters, dispatch }, name) {
            if (!name) {
                return
            }
            await getters.db.update({ name }, {
                $set: {
                    files: getters.gameData.newFiles.concat(getters.gameData.files),
                    newFiles: []
                }
            }, { })
            dispatch('fetchGameData', name)
        }
    },

    mutations: {
        setGameData(state, gameData) {
            state.gameData = gameData || {}
        },
        setGames(state, games) {
            state.games = games
        }
    }
})

store.dispatch('updateGames')

export default store
