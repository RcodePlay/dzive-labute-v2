const mongoose = require('mongoose')

const Schema = mongoose.Schema

//defining scheme for users
const userSchema = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')