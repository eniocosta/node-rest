const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.listar()
            .then(resultado => res.json(resultado))
            .catch(erro => res.status(400).json(erro))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.exibir(id)
            .then(resultado => res.json(resultado))
            .catch(erro => res.status(400).json(erro))
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
        Atendimento.alterar(id, data)
            .then(resultado => res.json(resultado))
            .catch(erro => res.status(400).json(erro))
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.excluir(id)
            .then(resultado => res.json(resultado))
            .catch(erro => res.status(400).json(erro))
    })
}