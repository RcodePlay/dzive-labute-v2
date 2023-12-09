const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sessionSchema = new Schema({
    user: String,
    token: String
})

module.exports = mongoose.model('session', sessionSchema, 'sessions')