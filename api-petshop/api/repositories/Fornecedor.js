const instance = require('../instances/Fornecedor')

module.exports = {
    list() {
        return instance.findAll()
    },
    
    create(data) {
        return instance.create(data)
    }
}