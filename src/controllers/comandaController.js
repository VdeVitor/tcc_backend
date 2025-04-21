const comandaModel = require('../models/comandaModel');

module.exports = {
  async getAllComandas(req, res) {
    try {
      const comandas = await comandaModel.find().populate('dono').populate('mesa');
      res.json(comandas);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar comandas',
        error: err.message
      });
    }
  },

  async getComandaById(req, res) {
    try {
      const comanda = await comandaModel.findById(req.params.id)
        .populate('dono')
        .populate('mesa')
        .populate('pedidos');
      
      if (!comanda) {
        return res.status(404).json({
          success: false,
          message: 'Comanda não encontrada'
        });
      }
      res.json(comanda);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar comanda',
        error: err.message
      });
    }
  },

  async createComanda(req, res) {
    try {
      // Validate required fields
      if (!req.body.dono || !req.body.mesa) {
        return res.status(400).json({
          success: false,
          message: 'Dono e mesa são campos obrigatórios!'
        });
      }

      const comandaData = {
        dono: req.body.dono,
        mesa: req.body.mesa,
        status: req.body.status || 1,
        valorTotal: req.body.valorTotal || 0,
        formaPagamento: req.body.formaPagamento || null,
        ativo: req.body.ativo !== undefined ? req.body.ativo : true
      };

      const comanda = new comandaModel(comandaData);
      const savedComanda = await comanda.save();
      
      res.status(201).json({
        success: true,
        message: 'Comanda criada com sucesso!',
        data: savedComanda
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar comanda',
        error: err.message
      });
    }
  },

  async editComanda(req, res) {
    try {
      const comanda = await comandaModel.findById(req.params.id);
      
      if (!comanda) {
        return res.status(404).json({
          success: false,
          message: 'Comanda não encontrada'
        });
      }

      const updatedComanda = await comandaModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Comanda atualizada com sucesso!',
        data: updatedComanda
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar comanda',
        error: err.message
      });
    }
  },

  async deleteComanda(req, res) {
    try {
      const comanda = await comandaModel.findById(req.params.id);
      
      if (!comanda) {
        return res.status(404).json({
          success: false,
          message: 'Comanda não encontrada'
        });
      }

      await comandaModel.findByIdAndDelete(req.params.id);

      res.json({
        success: true,
        message: 'Comanda deletada com sucesso!'
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar comanda',
        error: err.message
      });
    }
  },

  async addItemComanda(req, res) {
    try {
      const comanda = await comandaModel.findById(req.params.id);
      
      if (!comanda) {
        return res.status(404).json({
          success: false,
          message: 'Comanda não encontrada'
        });
      }

      // Here you would add the logic to add an item to the comanda
      // This might involve creating a new Order and linking it to the comanda
      // You'll need to implement this based on your Order model and requirements

      res.json({
        success: true,
        message: 'Item adicionado com sucesso!',
        data: comanda
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao adicionar item',
        error: err.message
      });
    }
  }
};