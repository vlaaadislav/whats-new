import Vue from 'vue'
import Vuex from 'vuex'
import db from '../datastore'
import fs from 'fs'
import path from 'path'

Vue.use(Vuex)

function getFilesInDir(dirpath) {
    return fs.readdirSync(dirpath).reduce((acc, file) => {
        file = path.join(dirpath, file)
        return acc.concat(fs.statSync(file).isDirectory() ? getFilesInDir(file) : file)
    }, [])
}

export default new Vuex.Store({
    strict: false,

    state: {
        db,
        extensions: [
            '.png',
            '.jpg',
            '.jpeg',
            '.gif',
            '.img'
        ]
    },

    getters: {
        db: (state) => state.db,
        ext: (state) => state.extensions
    },

    actions: {
        insert({ getters,  }, { name, path }) {
            const files = getFilesInDir(path)


            getters.db.insert({
                name,
                path,
                oldFiles: files,
                newFiles: []
            })
        }
    }
})
