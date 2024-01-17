const mongoose = require('mongoose')

const Schema = mongoose.Schema

//defining scheme for users
const userSchema = new Schema({
    username: String,
    password: String,
    token: String
})

module.exports = mongoose.model('user', userSchema, 'users')