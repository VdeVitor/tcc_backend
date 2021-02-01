const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;
        const [count] = await connection('product').count();
        
        const products = await connection('product').limit(10).offset((page - 1) * 10).select('*')


        return response.json(products);
    },

    async create(request, response){
    const { name, description, value } = request.body;

    await connection('product').insert({
        id,
        name,
        description,
        value,
    })
    
    return response.json('Produto inserido com id: '+id);
    }
};