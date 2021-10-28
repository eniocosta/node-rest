const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

const checkContentType = require('./http/request/AcceptFilter')
const ExceptionFilter = require('./http/exceptions/ExceptionFilter')

const router = require('./http/routes/api')

app.use(bodyParser.json())

app.use(checkContentType)

app.use('/api', router)

app.use(ExceptionFilter)

app.listen(config.get('api.port'), () => {
    console.log('Server is running')
})