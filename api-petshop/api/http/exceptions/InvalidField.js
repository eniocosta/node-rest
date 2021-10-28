class InvalidFieldException extends Error {
    constructor(field){
        super(`O campo '${field}' está inválido!`)
        this.name = 'InvalidField'
        this.idError = 0
    }
}

module.exports = InvalidFieldException