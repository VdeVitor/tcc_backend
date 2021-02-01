const express = require('express');
const connection = require('./database/connection');
const { request } = require('http');
const UserController = require('./controllers/userController');
const ProductController = require('./controllers/productController');
const TableController = require('./controllers/tableController');
const SessionController = require('./controllers/sessionController')

const routes = express.Router();

//rotas de login
routes.post('/sessions', SessionController.create);

//rotas de usuário
routes.post('/users', UserController.create);
routes.get('/users', UserController.index);

//rotas de produto
routes.post('/products', ProductController.create);
routes.get('/products', ProductController.index);

//rotas de mesas
routes.post('/table', TableController.create)
routes.get('/table', TableController.index)

//rotas de comandas
//routes.get('/order', OrderController.index);
//routes.post('/order', OrderController.create);



module.exports = routes;