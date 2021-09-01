const fs = require('fs')
const path = require('path')

module.exports = (pathUrl, nomeArquivo, callbackImagemCriada) => {
    const tiposValidos  = ['jpg', 'png', 'jpeg']
    const tipo          = path.extname(pathUrl)

    if(!tiposValidos.includes(tipo.substring(1))){
        callbackImagemCriada({erro: 'Tipo inválido'})
    } else {
        const finalPath     = `./assets/imagens/${nomeArquivo}${tipo}`
    
        fs.createReadStream(pathUrl)
            .pipe(fs.createWriteStream(finalPath))
            .on('finish', () => callbackImagemCriada(false, finalPath))
    }
    
}