const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Session = require('../models/session')


require('dotenv').config()

router.get('/', (req, res) => {
    res.send('Hello from Root')
})

router.post('/tlogin', (req, res) => {
    let userData = req.body
    User.findOne({username: userData.user}, (err, user) => {
        if (err) {
            console.log(err)
        } else if (!user) {
            res.status(401).send('Invalid user')
        } else  {
            Session.findOne({token: userData.token}, (error, token) => {
                if (error) {
                    res.json({ message: error})
                } else if (!token) {
                    res.status(401).json({ message: 'Invalid Token'})
                } else {
                    res.status(200).json({ message: 'Token login successful' })
                }
            })
        }
    })
})

module.exports = router