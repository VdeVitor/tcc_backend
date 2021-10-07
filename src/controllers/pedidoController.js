const pedidoModel = require('../models/pedidoModel');

module.exports = {
  getPedidos(req,res){
    pedidoModel.getAllPedidos((err, pedidos) => {
          if(err){
              res.send(err);
          } else {
              res.send(pedidos);
          }
      })
  },

  createPedido(req, res){
    pedidoModel.createPedido((err, pedido) => {
      if(err){
          res.send(err);
    } else {
        res.send(pedidos);
    }
    })
  }
}