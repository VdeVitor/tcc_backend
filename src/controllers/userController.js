const usuarioModel = require('../models/usuarioModel');

module.exports = {
    getUser(req,res){
        usuarioModel.getAllUsuarios((err, usuarios) => {
            console.log('Cheguei');
            if(err){
                res.send(err);
            } else {
                res.send(usuarios);
            }
        })
    },

    getUserById(req, res){
        usuarioModel.getUsuarioById(req.params.id, (err, usuario) => {
            if(err){
                res.send(err);
            } else {
                res.send(usuario);
            }
        })
    },

    createUser(req, res) {
        const usuarioReqData = new usuarioModel(req.body);

        if(req.body.constructor === Object && Object(req.body).length === 0) {
            res.send(400).send({success: false, message: 'Favor preencher todos os campos!'});
        } else {
            usuarioModel.createUsuario(usuarioReqData, (err, usuario) => {
                if(err)
                    res.send(err);
                    res.json({status: true, message: 'Usuário criado com sucesso!', data: usuario.insertId})
            })
        }
    },

    editUser(req, res) {
        const usuarioReqData = new usuarioModel(req.body);

        if(req.body.constructor === Object && Object(req.body).length === 0) {
            res.send(400).send({success: false, message: 'Favor preencher todos os campos!'});
        } else {
            usuarioModel.editUsuario(req.params.id, usuarioReqData, (err, usuario) => {
                if(err)
                    res.send(err);
                    res.json({status: true, message: 'Usuário alterado com sucesso!'})
            })
        }
    },

    deleteUser(req, res){
        usuarioModel.deleteUsuario(req.params.id, (err, usuario) => {
            if(err)
                res.send(err);
                res.json({success: true, message: 'Usuario deletado com sucesso!'})
        })
    }
}
