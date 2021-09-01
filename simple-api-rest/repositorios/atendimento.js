const query = require('../infra/database/queries')

class AtendimentoRepositorio {
    listar() {
        const sql = `SELECT * FROM atendimentos`
        return query(sql)
    }

    buscar(id) {
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`
        return query(sql)
    }

    adicionar(atendimento) {
        const sql = `INSERT INTO atendimentos SET ?`
        return query(sql, atendimento)
    }

    alterar(id, atendimento) {
        const sql = `UPDATE atendimentos SET ? WHERE id=?`
        return query(sql, [atendimento, id])
    }

    excluir(id) {
        const sql = `DELETE FROM atendimentos WHERE id=?`
        return query(sql, id)
    }
    
}

module.exports = new AtendimentoRepositorio