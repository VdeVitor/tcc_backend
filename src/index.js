const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectDB = require('./config/database');
require('dotenv').config();

const usuRouter = require('../src/routes/userRoute')
const prodRouter = require('../src/routes/productRoute')
const mesaRouter = require('../src/routes/mesaRouter')
const comandaRouter = require('../src/routes/comandaRoute')
const pedidoRouter = require('../src/routes/pedidosRoute')

//iniciando o projeto pelo express.
const app = express();

// Connect to MongoDB
connectDB();

//conversão do json para objeto entendível para a aplicação.
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
  key: 'userId',
  secret: process.env.SESSION_SECRET || '12345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 60 * 60 * 24,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}))

app.get('/', (req, res) => {
  res.send('easyBar');
})

app.use('/usuarios', usuRouter);
app.use('/produtos', prodRouter);
app.use('/mesas', mesaRouter);
app.use('/comandas', comandaRouter)
app.use('/pedidos', pedidoRouter);

//aplicação será escutada na porta definida no .env
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});