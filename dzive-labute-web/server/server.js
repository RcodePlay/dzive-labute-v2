const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 3000

const app = express()
const api = require('./routes/api')
app.use(cors({origin: 'http://localhost:4200'}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "frame-ancestors 'none'")
    next()
})
app.use('/api', api)
app.get('/', function(req, res) {
    res.send('Hello from server')
})

app.listen(PORT, function() {
    console.log('Server is running on localhost:' + PORT)
})