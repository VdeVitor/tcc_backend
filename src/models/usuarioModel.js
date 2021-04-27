const dbConn = require('../../config/db.config');

const usuario = function(usu){
  this.nome = usu.nome;
  this.telefone = usu.telefone;
  this.status = usu.status ? usu.status : 1;
  this.tipo = usu.tipo;
}

//get all usuarios
usuario.getAllUsuarios = (resultado) => {
  dbConn.query('SELECT * FROM usuarios', (err, res) => {
    if(err){
      console.log('Error fetching usuarios', err);
      resultado(null, err);
    } else {
      console.log('Query fetched successfully!');
      resultado(null, res);
    }
  })
}

//get usuario by id
usuario.getUsuarioById = (id, resultado) => {
  dbConn.query('SELECT * FROM usuarios WHERE idusuarios=?', id, (err, res) => {
    if(err) {
      console.log('Erro ao buscar usuário de id: ', err)
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}

//post create usuario
usuario.createUsuario = (usuarioReqData, resultado) => {
  dbConn.query('INSERT INTO usuarios SET ?', usuarioReqData, (err, res) => {
    if(err) {
      console.log('Erro ao criar usuário!', err);
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}


module.exports = usuario;