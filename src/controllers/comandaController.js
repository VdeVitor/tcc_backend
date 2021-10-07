const comandaModel = require('../models/comandaModel');

module.exports = {
  getAllComandas(req, res){
    comandaModel.getAllComandas((err, comandas) => {
      if(err){
        res.send(err);
      } else {
        res.send(comandas);
      }
    })
  },

  getComandaById(req, res){
    comandaModel.getComandaById(req.params.id, (err, comanda) => {
      if(err) {
        res.send(err);
      } else {
        res.send(comanda);
      }
    })
  },

  createComanda(req, res){
    const idData = req.body.id
      comandaModel.createComanda(idData, (err, comanda) => {
        if(err){
          res.send(err);
        } else {
          res.json({success: true, message: 'Comanda criada com sucesso!', id: comanda.insertId});
        }
      })
    },

  editComanda(req, res){
    const comandaReqData = new comandaModel(req.body);

    if(req.body.constructor === Object && Object(req.body).length === 0) {
      res.send(400).send({ success: false, message: 'Erro ao atualizar a comanda!'});
    } else {
      comandaModel.editComanda(comandaReqData, (err, comanda) => {
        if(err)
          res.send(err);
          res.json({success: true, message: 'Comanda atualizada com sucesso!', data: comanda.insertId});
      })
    }
  },

  deleteComanda(req, res){
    comandaModel.deleteComanda(req.params.id, (err, comanda) => {
      if(err)
        res.send(err);
        res.json({success: true, message:'Comanda deletada com sucesso!'});
    })
  },

  addItemComanda(req, res){
    const comandaReqData = new comandaModel(req.body);

    if(req.body.constructor === Object && Object(req.body).length === 0) {
      res.send(400).send({ success: false, message: 'Erro ao atualizar a comanda!'});
    } else {
      comandaModel.addItemComanda(comandaReqData, (err, comanda) => {
        if(err)
          res.send(err);
          res.json({success: true, message: 'Item adicionado com sucesso!', data: comanda.insertId});
      })
    }
  }

}