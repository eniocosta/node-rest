const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Página Atendimentos'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        //Método utilizado no curso, porém é melhor retornar o resultado e o controller enviar a resposta (TODO)
        Atendimento.adicionar(atendimento, res)
    })
}