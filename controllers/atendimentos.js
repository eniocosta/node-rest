
module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na página de atendimentos'))

    app.post('/atendimentos', (req, res) => {
        console.log(req.body)
        res.send('Você está enviando dados para atendimento')
    })
}