const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Session = require('../models/session')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')
const session = require('../models/session')
const checkTime = new Date()

require('dotenv').config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS
    }
});


router.get('/', (req, res) => {
    res.send('Hello from Auth')
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
                    const token = jwt.sign({ username: user.username, userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                    
                    let tokenObj = {
                        user: userData.username,
                        token: token
                    }

                    let session = new Session(tokenObj)
                    session.save((error, sessionSaved) => {
                        if (error) {
                            console.log(error)
                        } else {
                            console.log("success")
                        }
                    })

                    res.status(200).json({ token })

                    const loginTime = new Date();
                    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                
                    let mailOptions = {
                        from: process.env.MAIL_SENDER,
                        to: process.env.MAIL_RECIEVER,
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

                }
    })
})

router.post('/tokenlogin', (req, res) => {
    let loginData = req.body

    Session.findOne({user: loginData.user}, (error, session) => {
        if (error) {
            console.log(error)
        } else 
            if (!session) {
                res.status(401).send('Invalid user')
            } else if ( session.token !== loginData.token ) {
                    res.status(401).send('Invalid token')
                } else {
                    let token = loginData.token

                    res.status(200).json({ token })
                }
    })
})

router.get('/glogout', (req, res) => {
    Session.deleteMany({}, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            console.log(res)
        }
    })
    res.status(200).json({ message: 'Logged out' })
})

let have = false

function verifyToken(req, res, next) {
    // Get the token from the request headers
    const token = req.headers['authorization'];  

    // Check if we recieved a token
    if (!token) {
      return res.status(403).send({ message: 'No token provided.' });
      have = false
    }
  
    Session.findOne({token: token}, (err, session) => {
        if (err) {
            console.log(checktTime, " >> ", err)
        } else if (session) {
            console.log(checkTime, ' >> Checked user session')
            have = true
        } else {
            console.log(checkTime, " >> Session not found")
            have = false
        }
    })
}

router.get('/check', verifyToken, (req, res) => {
    const headers = req.headers['']

    if (have == false) {
        res.status(403).json({ message: 'Session not found' })
    } else if (have == true) {
        res.status(200).json({ message: 'Authentication approved', headers: headers })
    }
})

router.get('/logout', (req, res) => {
    const token = req.headers['authorization']
    Session.deleteOne({token}, (error, res) => {
        if (error) {
            console.log(error)
        } if (res) {
            console.log(res)
        }
    })
    res.status(200).json({ message: 'Logged out' })
})

module.exports = router