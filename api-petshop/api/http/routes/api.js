
const router = require('express').Router()
const ModelFornecedor = require('../../models/Fornecedor')

router.get('/fornecedores', async (req, res) => {
    const result = await ModelFornecedor.list()
    res.send(result)
})

router.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = router;