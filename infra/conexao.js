const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'node_agenda_pet'
})

module.exports = conexao