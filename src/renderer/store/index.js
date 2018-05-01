import Vue from 'vue'
import Vuex from 'vuex'
import db from '../datastore'
import fs from 'fs'
import path from 'path'

Vue.use(Vuex)

function getFilesInDir(dirpath, ext) {
    return fs.readdirSync(dirpath).reduce((acc, file) => {
        file = path.join(dirpath, file)
        if (ext.includes(path.extname(file))) {
            return acc.concat(file)
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
            '.img'
        ],
        games: []
    },

    getters: {
        db: (state) => state.db,
        ext: (state) => state.extensions,
        all: async (state) => await state.db.find({ }),
        games: (state) => state.games
    },

    actions: {
        async insert({ getters, dispatch }, { name, path }) {
            const files = await getFilesInDir(path, getters.ext)

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

        async updateGames({ getters, state }) {
            state.games = (await getters.db.find({ }, { name: 1 })).map(item => item.name)
        }
    }
})

store.dispatch('updateGames')

export default store
