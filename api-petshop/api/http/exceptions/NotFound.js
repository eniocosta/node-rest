class NotFoundException extends Error {
    constructor(msg){
        super(msg)
        this.name = 'NotFound'
        this.idError = 0
    }
}

module.exports = NotFoundException