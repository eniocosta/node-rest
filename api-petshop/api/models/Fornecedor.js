const instance = require('../instances/Fornecedor')

module.exports = {
    list() {
        return instance.findAll()
    }
}