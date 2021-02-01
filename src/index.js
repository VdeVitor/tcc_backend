const express = require('express');
const routes = require('./routes')
const cors = require('cors');

//iniciando o projeto pelo express.
const app = express();

//conversão do json para objeto entendível para a aplicação.
app.use(cors())
app.use(express.json());
app.use(routes);

//aplicação será escutada na porta 3333.
app.listen(3333);