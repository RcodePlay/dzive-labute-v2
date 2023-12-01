const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const nodemailer = require('nodemailer')
const crypto = require('crypto')

require('dotenv').config()


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_SENDER,
        pass: process.env.MAIL_PASS
    }
});

let secretKey = crypto.randomBytes(32).toString('hex')


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
    console.log(secretKey)
})


router.post('/glogout', (req, res) => {
    // Invalidate all tokens by generating a new secret key
    secretKey = crypto.randomBytes(32).toString('hex');
  
    // Send a response to the frontend
    res.status(200).send({ message: 'All users have been logged out.' });
  });



function verifyToken(req, res, next) {
    // Get the token from the request headers
    const token = req.headers['authorization'];
    console.log(secretKey)
    console.log(req.headers)
  
    // Check if token exists
    if (!token) {
      return res.status(403).send({ message: 'No token provided.' });
    }
  
    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(500).send({ message: 'Failed to authenticate token.' });
      }
  
      // If everything is good, save the decoded token to the request for use in other routes
      req.userId = decoded.id;
      next();
    });
}

router.get('/check', verifyToken, (req, res) => {
    res.status(200).send({ message: 'Checking Authentication' })
})

module.exports = router