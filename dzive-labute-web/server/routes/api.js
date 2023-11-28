const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Article = require('../models/article')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const jwt = require('jsonwebtoken')
const db = ""


const nodemailer = require('nodemailer')
const crypto = require('crypto')



//connecting database
mongoose.connect(db, err => {
    if (err) {
        console.error('Error!' + err)
    } else {
        console.log('Connected to mongodb')
    }
})

let secretKey = crypto.randomBytes(64).toString('hex')

//basic test if everything is okay
router.get('/', (req, res) => {
    res.send('From API route')
})


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your@gmail.com',
        pass: 'password'
    }
});


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
    const loginTime = new Date();
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    let mailOptions = {
        from: 'your@gmail.com',
        to: 'mine@gmail.com',
        subject: 'User Login at Dzive Labute',
        text: `User "${userData.username}" logged in at ${loginTime} from IP address ${ipAddress}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

})


router.post('/glogout', (req, res) => {
    // Invalidate all tokens by generating a new secret key
    secretKey = crypto.randomBytes(64).toString('hex');
  
    // Send a response to the frontend
    res.status(200).send({ message: 'All users have been logged out.' });
  });

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
