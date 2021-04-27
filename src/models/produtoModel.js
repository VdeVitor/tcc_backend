const dbConn = require('../../config/db.config');

const produto = function(prod) {
  this.nome = prod.nome;
  this.descricao = prod.descricao;
  this.valor = prod.valor;
}

//get all produtos
produto.getAllProdutos = (resultado) => {
  dbConn.query('SELECT * FROM produtos', (err, res) => {
    if(err){
      console.log('Error ao buscar produtos', err);
      resultado(null, err);
    } else {
      console.log('Produtos encontrados com sucesso!');
      resultado(null, res);
    }
  })
}

//get produto by id
produto.getProdById = (id, resultado) => {
  dbConn.query('SELECT * FROM produtos WHERE idprodutos=?', id, (err, res) => {
    if(err) {
      console.log('Erro ao buscar usuário de id: ', err)
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}

produto.createProd = (produtoReqData, resultado) => {
  dbConn.query('INSERT INTO produtos SET ?', produtoReqData, (err, res) => {
    if(err) {
      console.log('Erro ao criar produto!', err);
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}


module.exports = produto;