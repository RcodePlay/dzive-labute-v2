const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()

const db = process.env.DB_CONNECT


//connecting database
mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})



//basic test if everything is okay
router.get('/', (req, res) => {
    res.send('From API route')
})


//route for fetching all articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find().populate('author')
        res.json(articles)
    } catch (err) {
        res.status(500).send(err)
    }
})

//route for fetching articles by ID
router.get('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params

        const article = await Article.findById(id)

        if (!article) {
            return res.status(404).json({ message: 'Article not found' })
        }

        res.json(article)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//route for writing a new article
router.post('/newarticle', async (req, res) => {
    try {
        const {title, content, author} = req.body

        if (!title || !content || !author ) {
            return res.status(400).json({ error: 'Title, content and autohr are required fields'})
        }

        const article = new Article({
            title,
            content,
            author
        })

        const savedArticle = await article.save()
        res.status(201).json(savedArticle)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

//route for removing articles by ObjectID
router.delete('/articles/:id', async (req, res) => {
    try {
        const { id } = req.params//.articleId;
    
        if (!id) {
          return res.status(400).json({ error: 'Article ID is required' });
        }
    
        const deletedArticle = await Article.findByIdAndDelete(id);
    
        if (!deletedArticle) {
          return res.status(404).json({ error: 'Article not found' });
        }
    
        res.json({ message: 'Article removed successfully' });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})


//route for editing articles by ObjectID
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { title, content, author } = req.body

        const updatedArticle = await Article.findByIdAndUpdate(id, { title, content, author}, { new: true})

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' })
        }

        res.json(updatedArticle)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router
