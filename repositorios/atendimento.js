const query = require('../infra/database/queries')

class AtendimentoRepositorio {
    listar() {
        const sql = `SELECT * FROM atendimentos`
        return query(sql)
    }

    adicionar(atendimento) {
        const sql = `INSERT INTO atendimentos SET ?`
        return query(sql, atendimento)
    }
    
}

module.exports = new AtendimentoRepositorio