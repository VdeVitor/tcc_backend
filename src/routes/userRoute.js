const express = require('express');
const dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');
const session = require('express-session');
const saltRounds = 10;
const router = express.Router();

const userController = require('../controllers/userController');

//get all usuarios
router.get('/', userController.getUser);

//get usuario by id
router.get('/:id', userController.getUserById);

//create novo usuario
router.post('/cadastro', userController.createUser)

//altera usuario
router.put('/:id', userController.editUser)

//deleta usuario
router.delete('/:id', userController.deleteUser)

router.get("/session", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/login", (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;

  dbConn.query(
    'SELECT * FROM usuarios WHERE login = ?;',
    [login],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log(result);

      if (result.length > 0) {
        bcrypt.compare(senha, result[0].senha, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Login ou senha incorreto!" });
          }
        });
      } else {
        res.send({ message: "Usuário não existe" });
      }
    }
  );
});

module.exports = router;