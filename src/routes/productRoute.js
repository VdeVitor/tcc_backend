const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController')

//get all produtos
router.get('/', productController.getProd);

//get produto by id
router.get('/:id', productController.getProdById);

//create produto
router.post('/', productController.createProd);

//edita usuario
router.put('/:id', productController.editProd);

router.delete('/:id', productController.deleteProd);

module.exports = router;