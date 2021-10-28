class NotSupportedException extends Error {
    constructor(msg){
        super(msg)
        this.name = 'NotSupported'
        this.idError = 2
    }
}

module.exports = NotSupportedException