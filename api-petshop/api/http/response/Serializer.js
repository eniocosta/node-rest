const NotSupportedException = require('../exceptions/NotSupported')

const acceptTypes = ['application/json']

const checkContentType = (req, res, next) => {
    let contentType = req.header('Accept')
    
    if (contentType === "*/*") {
        contentType = 'application/json'
    }
    
    if (acceptTypes.includes(contentType)) {
        res.setHeader('Content-Type', contentType)
        next()
    } else {
        throw new NotSupportedException(`Tipo não suportado (${contentType})`)
    }
}

module.exports = checkContentType