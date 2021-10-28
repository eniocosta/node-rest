const NotFoundException = require('./NotFound')
const InvalidFieldException = require('./InvalidField')
const NotSupportedException = require('./NotSupported')

const exceptionFilter = (error, req, res, next) => {
    if (error instanceof NotFoundException){
        res.status(404)
    } else if (error instanceof InvalidFieldException) {
        res.status(400)
    } else if (error instanceof NotSupportedException) {
        res.status(406)
    } else {
        res.status(400)
    }
    res.send({message: error.message})
}

module.exports = exceptionFilter