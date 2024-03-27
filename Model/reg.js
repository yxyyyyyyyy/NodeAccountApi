const moogose = require('mongoose')

let RegSchema = new moogose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

let RegModel = moogose.model('users' , RegSchema)

module.exports = RegModel