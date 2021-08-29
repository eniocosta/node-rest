const conexao = require('../infra/conexao')
const moment = require('moment')
class Atendimento {
    adicionar(atendimento, res) {
        const dataCriacao       = moment().format('YYYY-MM-DD HH:mm:ss')
        const data              = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        
        const dataEhValida      = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido   = atendimento.cliente.length >= 3
        const validacoes        = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos três caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        
        if(erros.length){
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
    
            //Método utilizado no curso, porém é melhor utilizar ORM (TODO)
            const sql = `INSERT INTO atendimentos SET ?`
            conexao.query(sql, atendimentoDatado, (erro, resultado) => {
                if(erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultado)
                }
            })
        }
    }
}

module.exports = new Atendimento