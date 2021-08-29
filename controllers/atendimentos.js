const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        //Método utilizado no curso, porém é melhor retornar o resultado e o controller enviar a resposta (TODO)
        Atendimento.listar(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.exibir(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adicionar(atendimento, res)
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const data = req.body
        Atendimento.alterar(id, data, res)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.excluir(id, res)
    })
}