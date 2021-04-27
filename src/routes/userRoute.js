const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

//get all usuarios
router.get('/', userController.getUser);

//get usuario by id
router.get('/:id', userController.getUserById);

//create novo usuario
router.post('/', userController.createUser)

module.exports = router;