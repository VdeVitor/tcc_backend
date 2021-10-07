const dbConn = require('../../config/db.config');

const comanda = function(comanda){
  this.status = comanda.status;
  this.dono_id = comanda.dono_id;
  this.mesa_id = comanda.mesa_id;
}

comanda.getAllComandas = (resultado) => {
  dbConn.query('SELECT * FROM comanda', (err, res) => {
    if(err){
      console.log('Erro ao buscar comandas!', err);
      resultado(null, err);
    } else {
      console.log('Comandas encontradas com sucesso!');
      resultado(null, res);
    }
  })
}

comanda.getComandaById = (id, resultado) => {
  dbConn.query('SELECT * FROM comanda WHERE idcomanda=?',id , (err, res) => {
    if(err){
      console.log('Erro ao buscar comanda com id!', id);
      resultado(null, err);
    } else {
      console.log('Comanda encontrada com sucesso!');
      resultado(null, res);
    }
  })
}

comanda.editComanda = (id, comandaReqData, resultado) => {
  dbConn.query('UPDATE comanda SET dono_id = ? WHERE idcomanda = ?', [comandaReqData.dono_id, id], (err, res) => {
    if(err) {
      console.log('Erro ao alterar produto', err);
      resultado(null, err);
    } else {
      resultado(null, res);
    }
  })
}

comanda.createComanda = (id, resultado) => {
  dbConn.query(`INSERT INTO comanda (status, dono_id)
                VALUES(
                (1),
                (SELECT idusuarios AS dono_id FROM usuarios WHERE idusuarios = ?)
                );`, id, (err, res) => {
                  if(err){
                    console.log('Erro ao criar comanda!');
                    console.log(err);
                    resultado(null, err);
                  } else {
                    console.log('Comanda criada com sucesso!');
                    resultado(null, res);
                  }
                })
}

comanda.deleteComanda = (id, resultado) => {
  dbConn.query("DELETE FROM comanda WHERE idcomanda = ?", [id], (err, res) => {
    if(err) {
      console.log('Erro ao deletar comanda', err);
      resultado(null, err);
    } else {
      console.log('Comanda deletada com sucesso');
      resultado(null, res);
    }
  })
}

/* comanda.addItemComanda = (id, comandaReqData, resultado) => {
  dbConn.query("INSERT INTO comanda WHERE ")
} */

module.exports = comanda;