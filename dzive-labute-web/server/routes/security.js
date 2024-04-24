const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Session = require('../models/session')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')
const currentTime = new Date()

require('dotenv').config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS
    }
});


router.get('/', (req, res) => {
    res.send('Auth main')
})

function logWTime(message) {
    console.log(currentTime, " >> ", message)
}

//route for logging into the website
router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({username: userData.username}, (error, user) => {
        if (error) {
            logWTime(error)
        } else 
            if (!user) {
                res.status(401).send('Invalid user')
            } else if ( user.password !== userData.password ) {
                    res.status(401).send('Invalid password')
                } else {
                    const token = jwt.sign({ username: user.username, userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    
                    let tokenObj = {
                        user: userData.username,
                        token: token
                    }

                    let session = new Session(tokenObj)
                    session.save((error, sessionSaved) => {
                        if (error) {
                            logWTime(error)
                        } else if (sessionSaved) {
                            logWTime("Login successful")
                        }
                    })

                    res.status(200).json({ token })

                    const loginTime = new Date();
                    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                
                    let mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: process.env.MAIL_RECIEVER,
                        subject: 'User logged in to Dzive Labute admin panel',
                        text: `User "${userData.username}" logged in at ${loginTime} from ${ipAddress}`
                    };
                
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            logWTime(error);
                        } else {
                            logWTime('Email sent: ' + info.response);
                        }
                    })

                }
    })
})

router.get('/glogout', (req, res) => {
    Session.deleteMany({}, (err, res) => {
        if (err) {
            logWTime(err)
        } else {
            logWTime(res)
        }
    })
    res.status(200).json({ message: 'Logged out' })
})

let legitToken = false

router.get('/isa', (req, res) => {
    const reqJwt = req.headers['Authorization']
    
    if (!reqJwt) {
        legitToken = false
        logWTime('No token provided')
        res.status(400).json({ error: 'No token provided'})
    }

    Session.findOne({token: reqJwt}, (err, session) => {
        if (err) {
            logWTime(err)
        } else if (session) {
            logWTime('Found user session')
            legitToken = true
        } else {
            logWTime('No session found')
            legitToken = false
        }
    })
    })

router.get('/logout', (req, res) => {
    const token = req.headers['Authorization']
    Session.deleteOne({token}, (error, res) => {
        if (error) {
            logWTime(error)
        } if (res) {
            logWTime(res)
        }
    })
    res.status(200).json({ message: 'Logged out' })
})

module.exports = router