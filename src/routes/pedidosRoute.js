const express = require('express');
const router = express.Router();

const pedidoController = require('../controllers/pedidoController');

// get all pedidos
router.get('/', pedidoController.getPedidos);

router.post('/cria', pedidoController.createPedido);

module.exports = router;