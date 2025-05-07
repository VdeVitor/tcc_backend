const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');

//get all mesas
router.get('/', tableController.getMesas);

//get mesa by numero
router.get('/numero/:numero', tableController.getMesaById);

//update mesa status
router.put('/:numero/status', tableController.updateMesaStatus);

module.exports = router;