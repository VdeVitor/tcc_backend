const produtoModel = require('../models/produtoModel');

module.exports = {
    getProd(req,res){
      produtoModel.getAllProdutos((err, produtos) => {
            if(err){
                res.send(err);
            } else {
                res.send(produtos);
            }
        })
    },

    getProdById(req, res){
      produtoModel.getProdById(req.params.id, (err, produto) => {
            if(err){
                res.send(err);
            } else {
                res.send(produto);
            }
        })
    },

    createProd(req, res) {
        const produtoReqData = new produtoModel(req.body);

        if(req.body.constructor === Object && Object(req.body).length === 0) {
            res.send(400).send({success: false, message: 'Favor preencher todos os campos!'});
        } else {
            produtoModel.createProd(produtoReqData, (err, produto) => {
                if(err)
                    res.send(err);
                    res.json({status: true, message: 'Produto criado com sucesso!', data: produto.insertId})
            })
        }
    },

    editProd(req, res){
        const produtoReqData = new produtoModel(req.body);

        if(req.body.constructor === Object && Object(req.body).length === 0) {
            res.send(400).send({success: false, message: 'Favor preencher todos os campos!'});
        } else {
            produtoModel.editProd(req.params.id, produtoReqData, (err, produto) => {
                if(err)
                    res.send(err);
                    res.json({status: true, message: 'Produto alterado com sucesso!', data: produto.insertId})
            })
        }
    },

    deleteProd(req, res) {
        produtoModel.deleteProd(req.params.id, (err, produto) => {
            if(err)
            res.send(err);
            res.json({status: true, message: 'Produto deletado com sucesso'})
        })
    }

}
