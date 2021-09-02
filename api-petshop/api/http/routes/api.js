
const router = require('express').Router()
const FornecedorRepository = require('../../repositories/Fornecedor')
const FornecedorModel = require('../../models/Fornecedor')

router.get('/fornecedores', async (req, res) => {
    const result = await FornecedorRepository.list()
    res.send(result)
})

router.post('/fornecedores', async (req, res) => {
    const data = req.body
    const fornecedor = new FornecedorModel(data)
    await fornecedor.create()
    res.json(fornecedor)
})

router.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = router;