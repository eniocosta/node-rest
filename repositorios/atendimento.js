const query = require('../infra/database/queries')

class AtendimentoRepository {
    adicionar(atendimento) {
        const sql = `INSERT INTO atendimentos SET ?`
        return query(sql, atendimento)
    }
    
}

module.exports = new AtendimentoRepository