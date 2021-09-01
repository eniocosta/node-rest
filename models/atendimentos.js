const conexao = require('../infra/database/conexao')
const moment = require('moment')
const axios = require('axios')
const AtendimentoRepositorio = require('../repositorios/atendimento')

class Atendimento {
    constructor() {
        this.dataEhValida       = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido    = ({qtdDigitos}) => qtdDigitos == 11

        this.validar = parametros => {
            return this.validacoes.filter(campo => {
                const { nome } = campo
                const parametro = parametros[nome]

                return !campo.ehValido(parametro)
            })
        }
        
        this.validacoes = [
            {
                nome: 'data',
                ehValido: this.dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                ehValido: this.clienteEhValido,
                mensagem: 'CPF do cliente inválido'
            }
        ]
    }

    listar() {
        return AtendimentoRepositorio.listar()
    }

    exibir(id) {
        return AtendimentoRepositorio.buscar(id)
                .then(async resultado => {
                    const atendimento = resultado[0]
                    if(atendimento){
                        const cpf = atendimento.cliente
                        const { data } = await axios.get(`http://localhost:8082/${cpf}`)
                        atendimento.cliente = data
                    }
                    return atendimento
                })

    }

    adicionar(atendimento) {
        console.log(atendimento)
        const dataCriacao       = moment().format('YYYY-MM-DD HH:mm:ss')
        const data              = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const erros = this.validar({
            data:       {data, dataCriacao},
            cliente:    {qtdDigitos: atendimento.cliente.length}
        })
        
        if(erros.length){
            return new Promise((resolve, reject) => reject(erros))
        } else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}    
            return AtendimentoRepositorio.adicionar(atendimentoDatado)
                    .then(resultado => {
                        let id = resultado.insertId
                        return ({id, ...atendimento, dataCriacao})
                    })
        }
    }

    alterar(id, valores) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }

        const erros = this.validar({
            data:       {data: valores.data, dataCriacao: valores.data},
            cliente:    {qtdDigitos: valores.cliente.length}
        })
        
        if(erros.length){
            return new Promise((resolve, reject) => reject(erros))
        } else {
            return AtendimentoRepositorio.alterar(id, valores)
                    .then(resultado => ({id, ...valores}))            
        }
    }

    excluir(id) {
        return AtendimentoRepositorio.excluir(id).then(resultado => ({id}))
    }
}

module.exports = new Atendimento