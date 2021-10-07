const dbConn = require('../../config/db.config');

const produto = function(prod) {
  this.nome = prod.nome;
  this.descricao = prod.descricao;
  this.categoria = prod.categoria;
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
  console.log(id)
  dbConn.query('SELECT * FROM produtos WHERE idprodutos=?', id, (err, res) => {
    if(err) {
      console.log('Erro ao buscar usuário de id: ', err);
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}

produto.createProd = (produtoReqData, resultado) => {
  console.log('>>>>',produtoReqData)
  dbConn.query('INSERT INTO produtos SET ?', produtoReqData, (err, res) => {
    if(err) {
      console.log('Erro ao criar produto!', err);
      resultado(null, err);
    } else {
      console.log(produtoReqData);
      resultado(null, res);
    }
  })
}

produto.editProd = (id, produtoReqData, resultado) => {
  dbConn.query('UPDATE produtos SET nome = ?, descricao = ?, valor = ? WHERE idprodutos = ?', [produtoReqData.nome, produtoReqData.descricao, produtoReqData.valor, id], (err, res) => {
    if(err) {
      console.log('Erro ao alterar produto', err);
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}

produto.deleteProd = (id, resultado) => {
  dbConn.query("DELETE FROM produtos WHERE idprodutos = ?", [id], (err, res) => {
    if(err) {
      console.log('Erro ao deletar produto', err);
      resultado(null, err);
    } else {
      console.log('Produto deletado com sucesso');
      resultado(null, res);
    }
  })
}


module.exports = produto;