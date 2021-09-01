const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listar()
            .then(resultados => res.json(resultados))
            .catch(erro => res.status(400).json(erro))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.exibir(id, res)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adicionar(atendimento)
            .then(resultado => res.status(201).json(resultado))
            .catch(erro => res.status(400).json(erro))
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