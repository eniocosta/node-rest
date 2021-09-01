const mysql = require('mysql')

//Método utilizado no curso, porém é melhor utilizar variáveis de ambiente (TODO)
const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'node_agenda_pet'
})

module.exports = conexao