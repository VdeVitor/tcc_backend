const dbConn = require('../../config/db.config');

const mesa = (mesa) => {
  this.numero = mesa.numero;
  this.status = mesa.status ? mesa.status : 0;
}

//get all mesas
mesa.getAllMesas = (resultado) => {
  dbConn.query('SELECT * FROM mesa', (err, res) => {
    if(err){
      console.log('Erro ao buscar mesas', err);
      resultado(null, err);
    } else {
      console.log('Mesas encontradas com sucesso');
      resultado(null, res);
    }
  })
}

//get mesa by id
mesa.getMesaById = (id, resultado) => {
  dbConn.query('SELECT * FROM mesa WHERE idmesa=?', id, (err, res) => {
    if(err) {
      console.log('Erro ao buscar mesa de id referente', err);
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}

module.exports = mesa;