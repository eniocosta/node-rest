const conexao = require('./conexao')

const executar = (query, parametros = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, parametros, (erro, resultado, campos) => {
            if(erro){
               reject(erro)
            } else {
                resolve(resultado)
            }   
        })
    })
}

module.exports = executar