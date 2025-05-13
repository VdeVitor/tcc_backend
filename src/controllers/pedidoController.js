const pedidoModel = require('../models/pedidoModel');

module.exports = {
  async getPedidos(req, res) {
    try {
      const pedidos = await pedidoModel.find()
        .populate('produto')
        .populate('comanda');
      res.json(pedidos);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedidos',
        error: err.message
      });
    }
  },

  async createPedido(req, res) {
    try {
      const pedidoData = {
        status: req.body.status || 0,
        valor: req.body.valor,
        quantidade: req.body.quantidade,
        produto: req.body.produto,
        comanda: req.body.comanda,
        dono: req.body.dono,
        observacoes: req.body.observacoes || ''
      };

      const novoPedido = new pedidoModel(pedidoData);
      const pedidoSalvo = await novoPedido.save();

      // Popula os dados relacionados
      const pedidoCompleto = await pedidoModel.findById(pedidoSalvo._id)
        .populate('produto')
        .populate('comanda');

      res.status(201).json({
        success: true,
        message: 'Pedido criado com sucesso',
        data: pedidoCompleto
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar pedido',
        error: err.message
      });
    }
  },

  // Novo método para atualizar o status do pedido
  async updatePedidoStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validação do status
      if (status === undefined || ![0, 1, 2, 3].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status inválido. Deve ser um número entre 0 e 3'
        });
      }

      // Busca e atualiza o pedido
      const pedidoAtualizado = await pedidoModel.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      ).populate('produto').populate('comanda');

      if (!pedidoAtualizado) {
        return res.status(404).json({
          success: false,
          message: 'Pedido não encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Status do pedido atualizado com sucesso',
        data: pedidoAtualizado
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar status do pedido',
        error: err.message
      });
    }
  },

  // Buscar pedidos por dono (clerkId)
  async getPedidosByDono(req, res) {
    try {
      const { dono } = req.params;
      
      const pedidos = await pedidoModel.find({ dono })
        .populate('produto')
        .populate('comanda')
        .sort({ createdAt: -1 }); // Ordena do mais recente para o mais antigo

      res.json({
        success: true,
        data: pedidos
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedidos do dono',
        error: err.message
      });
    }
  },

  // Buscar pedidos por comanda
  async getPedidosByComanda(req, res) {
    try {
      const { comandaId } = req.params;
      
      const pedidos = await pedidoModel.find({ comanda: comandaId })
        .populate('produto')
        .populate('comanda')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: pedidos
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pedidos da comanda',
        error: err.message
      });
    }
  },

  // Deletar pedidos por comanda
  async deletePedidosByComanda(req, res) {
    try {
      const { comandaId } = req.params;
      
      const resultado = await pedidoModel.deleteMany({ comanda: comandaId });

      res.json({
        success: true,
        message: `${resultado.deletedCount} pedidos deletados com sucesso`,
        deletedCount: resultado.deletedCount
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pedidos da comanda',
        error: err.message
      });
    }
  },

  // Deletar pedidos por dono
  async deletePedidosByDono(req, res) {
    try {
      const { dono } = req.params;
      
      const resultado = await pedidoModel.deleteMany({ dono });

      res.json({
        success: true,
        message: `${resultado.deletedCount} pedidos deletados com sucesso`,
        deletedCount: resultado.deletedCount
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao deletar pedidos do dono',
        error: err.message
      });
    }
  }
}