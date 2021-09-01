const server = require('./config/server')
const conexao = require('./infra/database/conexao')
const Tabelas = require('./infra/database/tabelas')

conexao.connect((erro) => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('Conexão estabelecida com o DB')
        Tabelas.init(conexao)

        const app = server()
        app.listen(3000, () => console.log('Servidor iniciado na porta 3000'))
    }
})
