const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

const router = require('./http/routes/api')

app.use(bodyParser.json())

app.use('/api', router)

app.listen(config.get('api.port'), () => {
    console.log('Server is running')
})