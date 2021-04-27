const mesaModel = require('../models/mesaModel');

module.exports = {
  getMesas(req, res){
    mesaModel.getAllMesas((err, mesas) => {
      if(err){
        res.send(err);
      } else {
        res.send(mesas);
      }
    })
  },

  getMesaById(req, res){
    mesaModel.getMesaById(req.params.id, (err, mesa) => {
      if(err){
        res.send(err);
      } else {
        res.send(mesa);
      }
    })
  },

}