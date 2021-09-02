const repository = require('../repositories/Fornecedor')
class Fornecedor {
    constructor({
        id,
        empresa,
        email,
        categoria,
        dataCriacao,
        dataAtualizacao,
        versao
    }) {
        this.id                 = id
        this.empresa            = empresa
        this.email              = email
        this.categoria          = categoria
        this.dataCriacao        = dataCriacao
        this.dataAtualizacao    = dataAtualizacao
        this.versao             = versao
    }

    async create() {
        const result = await repository.create({
            empresa:    this.empresa,
            email:      this.email,
            categoria:  this.categoria
        })

        this.id                 = result.id
        this.dataCriacao        = result.dataCriacao
        this.dataAtualizacao    = result.dataAtualizacao
        this.versao             = result.versao
    }

    async load() {
        const result            = await repository.load(this.id)
        this.empresa            = result.empresa
        this.email              = result.email
        this.categoria          = result.categoria
        this.dataCriacao        = result.dataCriacao
        this.dataAtualizacao    = result.dataAtualizacao
        this.versao             = result.versao
    }

    async update() {
        await repository.load(this.id)
        const fields    = ['empresa', 'email', 'categoria']
        const data      = {}

        fields.forEach(field => {
            const value = this[field]
            if(typeof value === 'string' && value.length > 0){
                data[field] = value
            }
        })

        if(Object.keys(data).length !== 3){
            throw new Error('Todos os campos são obrigatórios')
        }

        await repository.update(this.id, data)
    }
}

module.exports = Fornecedor