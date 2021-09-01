const conexao = require('../infra/database/conexao')
const uploadArquivo = require('../infra/arquivos/upload')

class Pet {
    adicionar(pet, res) {
        const query = 'INSERT INTO pets SET ?'

        uploadArquivo(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                const novoPet = { nome: pet.nome, imagem: novoCaminho }
                conexao.query(query, novoPet, (erro, resultado) => {
                    if(erro) {
                        console.log(erro)
                        res.status(400).json(erro)
                    } else {
                        let id = resultado.insertId
                        res.status(201).json({id, ...novoPet})
                    }
                })
            }
        })
    }
}

module.exports = new Pet