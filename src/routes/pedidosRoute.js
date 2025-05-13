const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

// get all pedidos
router.get('/', pedidoController.getPedidos);

// delete pedidos by comanda
router.delete('/comanda/:comandaId', pedidoController.deletePedidosByComanda);

// delete pedidos by dono
router.delete('/dono/:dono', pedidoController.deletePedidosByDono);

router.post('/cria', pedidoController.createPedido);

// Nova rota para atualizar o status do pedido
router.patch('/:id/status', pedidoController.updatePedidoStatus);

module.exports = router;