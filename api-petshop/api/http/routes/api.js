
const router = require('express').Router()
const FornecedorRepository = require('../../repositories/Fornecedor')
const FornecedorModel = require('../../models/Fornecedor')

router.get('/fornecedores', async (req, res) => {
    const result = await FornecedorRepository.list()
    res.send(result)
})

router.get('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new FornecedorModel({id})
        await fornecedor.load()
        res.send(fornecedor)
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.post('/fornecedores', async (req, res) => {    
    try {
        const data = req.body
        const fornecedor = new FornecedorModel(data)
        await fornecedor.create()
        res.status(201).json(fornecedor)
    } catch(error) {
        res.status(400).send({message: error.message})
    }
})

router.put('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const data = {id, ...body}

        const fornecedor = new FornecedorModel(data)
        await fornecedor.update()
        res.send(fornecedor)
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.delete('/fornecedores/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedor = new FornecedorModel({id})
        await fornecedor.load()
        await fornecedor.delete()
        res.status(204).end()
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

module.exports = router;