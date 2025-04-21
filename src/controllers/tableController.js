const mesaModel = require('../models/mesaModel');

module.exports = {
  async getMesas(req, res) {
    try {
      const mesas = await mesaModel.find();
      res.json(mesas);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar mesas',
        error: err.message
      });
    }
  },

  async getMesaById(req, res) {
    try {
      const mesa = await mesaModel.findById(req.params.id);
      if (!mesa) {
        return res.status(404).json({
          success: false,
          message: 'Mesa não encontrada'
        });
      }
      res.json(mesa);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar mesa',
        error: err.message
      });
    }
  },

  async criaMesa(req, res) {
    try {
      const mesa = new mesaModel(req.body);
      const savedMesa = await mesa.save();
      res.status(201).json({
        success: true,
        message: 'Mesa criada com sucesso!',
        data: savedMesa
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar mesa',
        error: err.message
      });
    }
  }
};