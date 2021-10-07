const dbConn = require('../../config/db.config');

const pedido = (pedido) => {
  this.status = pedido.status? pedido.status : 0;
  this.valor = pedido.valor;
  this.quantidade = pedido.quantidade;
  this.produto_id = pedido.produto_id;
  this.comanda_id = pedido.comanda_id;
}

pedido.getAllPedidos = (resultado) => {
  dbConn.query('SELECT * FROM pedidos', (err, res) => {
    if(err){
      console.log('Error ao buscar pedidos', err);
      resultado(null, err);
    } else {
      console.log('Produtos encontrados com sucesso!');
      resultado(null, res);
    }
  })
}


pedido.createPedido = (pedidoReqData, resultado) => {
  const {
    status,
    valor,
    quantidade,
    produto_id,
    comanda_id
  } = pedidoReqData;
  dbConn.query(`INSERT INTO pedidos (status, valor, quantidade, produto_id, comanda_id) VALUES (${status}, ${valor}, ${quantidade}, ${produto_id}, ${comanda_id})`, (err, res) => {
    if(err) {
      console.log('Erro ao criar pedido!', err);
      resultado(null, err);
    } else {
       resultado(null, res);
    }
  })
}

module.exports = pedido;

