const mongoose = require('mongoose')

const Schema = mongoose.Schema

//defining scheme for articles
const articleSchema = new Schema({
    title: String,
    content: String,
    num: Number
})

module.exports = mongoose.model('article', articleSchema, 'articles')