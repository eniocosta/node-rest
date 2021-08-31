const conexao = require('../infra/conexao')
const moment = require('moment')
const axios = require('axios')
class Atendimento {
    listar(res) {
        //Método utilizado no curso, porém é melhor utilizar ORM (TODO)
        const sql = `SELECT * FROM atendimentos`

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }

    exibir(id, res) {
        //Método utilizado no curso, porém é melhor utilizar ORM (TODO)
        const sql = `SELECT * FROM atendimentos WHERE id = ${id}`
        
        conexao.query(sql, async (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const atendimento   = resultados[0]
                const httpStatus    = atendimento ? 200 : 404
                
                if(atendimento){
                    const cpf = atendimento.cliente
                    const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                    atendimento.cliente = data
                } 
                
                res.status(httpStatus).json(atendimento)
            }
        })
    }

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
                    let id = resultado.insertId
                    res.status(201).json({id, ...atendimento, dataCriacao})
                }
            })
        }
    }

    alterar(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const sql = `UPDATE atendimentos SET ? WHERE id=?`
        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id, ...valores})
            }
        })
    }

    excluir(id, res) {
        const sql = `DELETE FROM atendimentos WHERE id=?`
        conexao.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento