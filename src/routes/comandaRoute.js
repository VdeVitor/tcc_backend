const express = require('express');
const router = express.Router();

const comandaController = require('../controllers/comandaController')

//get all comandas
router.get('/', comandaController.getAllComandas);

//get comandas by owner
router.get('/dono/:clerkId', comandaController.getComandasByDono);

//get comandas by table number
router.get('/mesa/:numero', comandaController.getComandaByTable);

//get comandas by id
router.get('/:id', comandaController.getComandaById);

//create comanda
router.post('/', comandaController.createComanda);

//edita comanda
router.put('/:clerkId', comandaController.editComanda);

router.delete('/:id', comandaController.deleteComanda);

//add item to comanda
router.post('/dono/:clerkId/items', comandaController.addItemComanda);

module.exports = router;