const conexao = require('../infra/conexao'
)
class Atendimento {
    adicionar(atendimento) {
        //Método utilizado no curso, porém é melhor utilizar ORM (TODO)
        const sql = `INSERT INTO atendimentos SET ?`
        conexao.query(sql, atendimento, (erro, resultado) => {
            if(erro) {
                console.log(erro)    
            } else {
                console.log(resultado)
            }
        })
    }
}

module.exports = new Atendimento