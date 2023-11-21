const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Article = require('../models/article')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const db = ""

//connecting database
mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

const secretKey = '>em)Pyoz%95C+L-hZe^-'

//basic test if everything is okay
router.get('/', (req, res) => {
    res.send('From API route')
})

//route for logging into the website
router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({username: userData.username}, (error, user) => {
        if (error) {
            console.log(error)
        } else 
            if (!user) {
                res.status(401).send('Invalid user')
            } else if ( user.password !== userData.password ) {
                    res.status(401).send('Invalid password')
                } else {
                    const token = jwt.sign({ username: user.username, userId: user._id }, secretKey, { expiresIn: '1h' });
                    res.status(200).json({ token })
                }
            
        
    })
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
module.exports = router