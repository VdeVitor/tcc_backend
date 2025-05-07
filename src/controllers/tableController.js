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
      const mesa = await mesaModel.findOne({ numero: req.params.id });
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

  async updateMesaStatus(req, res) {
    try {
      const { numero } = req.params;
      const { status } = req.body;

      // Validate status
      if (status === undefined || ![0, 1, 2].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status inválido. Use 0 (livre), 1 (ocupada) ou 2 (reservada)'
        });
      }

      const mesa = await mesaModel.findOneAndUpdate(
        { numero: numero },
        { status: status },
        { new: true, runValidators: true }
      );

      if (!mesa) {
        return res.status(404).json({
          success: false,
          message: 'Mesa não encontrada'
        });
      }

      res.json({
        success: true,
        message: 'Status da mesa atualizado com sucesso',
        data: mesa
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar status da mesa',
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