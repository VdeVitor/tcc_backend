const express = require('express');
const router = express.Router();

const tableController = require('../controllers/tableController');

//get all mesas
router.get('/', tableController.getMesas);

//get mesa by id
router.get('/:id', tableController.getMesaById);

module.exports = router;