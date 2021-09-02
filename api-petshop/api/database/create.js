const InstanceFornecedor = require('../instances/Fornecedor')

InstanceFornecedor
    .sync()
    .then(() => console.log('Table Created'))
    .catch((error) => console.log(error))