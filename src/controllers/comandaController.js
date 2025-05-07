const comandaModel = require('../models/comandaModel');
const Table = require('../models/mesaModel');
const Product = require('../models/produtoModel');
const User = require('../models/usuarioModel');

module.exports = {
  async getAllComandas(req, res) {
    try {
      const comandas = await comandaModel.find()
        .populate({
          path: 'dono',
          select: 'clerkId nome email tipo'
        })
        .populate({
          path: 'produtos.produto',
          select: 'nome descricao categoria valor'
        });
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
        .populate({
          path: 'dono',
          select: 'clerkId nome email tipo'
        })
        .populate({
          path: 'produtos.produto',
          select: 'nome descricao categoria valor'
        });
      
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

      // Find table by number
      const table = await Table.findOne({ numero: req.body.mesa });
      if (!table) {
        return res.status(404).json({
          success: false,
          message: 'Mesa não encontrada!'
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
      const comanda = await comandaModel.findOne({ 
        dono: req.params.clerkId
      });
      
      if (!comanda) {
        return res.status(404).json({
          success: false,
          message: 'Comanda não encontrada'
        });
      }

      // Atualiza apenas os campos permitidos
      const updateData = {
        status: req.body.status,
        formaPagamento: req.body.formaPagamento,
        valorTotal: req.body.valorTotal
      };

      // Se o status for 0 (fechada), marca como inativa
      if (req.body.status === 0) {
        updateData.ativo = false;
      }

      const updatedComanda = await comandaModel.findOneAndUpdate(
        { _id: comanda._id },
        updateData,
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
      // Find comanda by clerkId
      const comanda = await comandaModel.findOne({ 
        dono: req.params.clerkId,
        status: 1 // Only add items to open bills
      });
      
      if (!comanda) {
        return res.status(404).json({
          success: false,
          message: 'Comanda não encontrada ou não está aberta'
        });
      }

      // Validate required fields
      if (!req.body.produto || !req.body.quantidade) {
        return res.status(400).json({
          success: false,
          message: 'Produto e quantidade são obrigatórios'
        });
      }

      // Find product
      const produto = await Product.findById(req.body.produto);
      if (!produto) {
        return res.status(404).json({
          success: false,
          message: 'Produto não encontrado'
        });
      }

      // Add product to bill
      comanda.produtos.push({
        produto: produto._id,
        quantidade: req.body.quantidade,
        valor: produto.valor,
        observacoes: req.body.observacoes || '',
        status: 'pendente'
      });

      // Calculate new total
      await comanda.calcularTotal();
      await comanda.save();

      // Populate the updated comanda
      const updatedComanda = await comandaModel.findOne({ _id: comanda._id })
        .populate({
          path: 'produtos.produto',
          select: 'nome descricao categoria valor'
        });

      res.json({
        success: true,
        message: 'Item adicionado com sucesso!',
        data: updatedComanda
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao adicionar item',
        error: err.message
      });
    }
  },

  async getComandasByDono(req, res) {
    try {
      // Find comandas using the clerkId directly
      const comandas = await comandaModel.find({ dono: req.params.clerkId })
        .populate({
          path: 'produtos.produto',
          select: 'nome descricao categoria valor'
        });
      
      if (!comandas || comandas.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma comanda encontrada para este usuário'
        });
      }

      res.json({
        success: true,
        data: comandas
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar comandas do usuário',
        error: err.message
      });
    }
  },

  async getComandaByTable(req, res) {
    try {
      const comandas = await comandaModel.find({ 
        mesa: req.params.numero,
        ativo: true,
        status: 1
      })
      .populate({
        path: 'dono',
        select: 'clerkId nome email tipo'
      })
      .populate({
        path: 'produtos.produto',
        select: 'nome descricao categoria valor'
      });
      
      if (!comandas || comandas.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Nenhuma comanda ativa encontrada para esta mesa'
        });
      }

      res.json({
        success: true,
        data: comandas
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar comandas da mesa',
        error: err.message
      });
    }
  }
};