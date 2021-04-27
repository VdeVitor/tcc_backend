const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const usuRouter = require('../src/routes/userRoute')
const prodRouter = require('../src/routes/productRoute')
const mesaRouter = require('../src/routes/mesaRouter')

//iniciando o projeto pelo express.
const app = express();

//conversão do json para objeto entendível para a aplicação.
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res) => {
  res.send('easyBar');
})

app.use('/usuarios', usuRouter);
app.use('/produtos', prodRouter);
app.use('/mesas', mesaRouter);

//aplicação será escutada na porta 3333.
app.listen(3333);