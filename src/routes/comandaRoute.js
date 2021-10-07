const express = require('express');
const router = express.Router();

const comandaController = require('../controllers/comandaController')

//get all produtos
router.get('/', comandaController.getAllComandas);

//get produto by id
router.get('/:id', comandaController.getComandaById);

//create produto
router.post('/', comandaController.createComanda);

//edita usuario
router.put('/:id', comandaController.editComanda);

router.delete('/:id', comandaController.deleteComanda);

router.put('/:id', comandaController.addItemComanda);

module.exports = router;