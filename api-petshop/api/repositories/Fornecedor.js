const instance = require('../instances/Fornecedor')
const NotFoundException = require('../http/exceptions/NotFound')

module.exports = {
    list() {
        return instance.findAll()
    },
    
    create(data) {
        return instance.create(data)
    },

    async load(id) {
        const result = await instance.findOne({where: {id}})
        
        if(!result) {
            throw new NotFoundException('Fornecedor não encontrado')
        }

        return result
    },

    async update(id, data) {
        return instance.update(data, {where: {id}})
    },

    async delete(id) {
        return instance.destroy({ where: { id }})
    }


}