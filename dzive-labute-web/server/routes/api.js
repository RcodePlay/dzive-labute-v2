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
        const articles = Article.find().sort({num: -1}).exec((err, articles) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.json(articles)
            }
        })
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
    const {title, content} = req.body
    if (!title || !content ) {
            return res.status(400).json({ error: 'Title and content are required fields'})
        }

    Article.findOne().sort({'num': -1}).exec(async (err, latestArticle) => {
        if (err) {
            res.send(err)
        } else {
            let latestSerialNumber = latestArticle.num
            console.log(latestArticle.num)
            let newSerialNumber = latestSerialNumber + 1
            console.log(newSerialNumber)
            

        const article = new Article({
            title: req.body.title,
            content: req.body.content,
            num: newSerialNumber
        })

        const savedArticle = await article.save()
        res.status(201).json(savedArticle)
        }
    })     
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
        const { title, content, num } = req.body

        const updatedArticle = await Article.findByIdAndUpdate(id, { title, content, num}, { new: true})

        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' })
        }

        res.json(updatedArticle)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
module.exports = router
