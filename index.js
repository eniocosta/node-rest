const server = require('./config/server')
const conexao = require('./infra/conexao')

conexao.connect((erro) => {
    if(erro) {
        console.log(erro)
    } else {
        console.log('DB Connected')
        
        const app = server()
        app.listen(3000, () => console.log('Server started on port 3000'))
    }
})
