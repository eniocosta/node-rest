const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Página Atendimentos'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adicionar(atendimento)
        res.send('Página Atendimentos [POST]')
    })
}