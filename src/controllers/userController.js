const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
        const users = await connection('users').select('*')

        return response.json(users);
    },

    async create(request, response){
    const { name, phone, status, tipo} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('users').insert({
        id,
        name,
        phone,
        status,
        tipo,
    })
    
    return response.json('Usuário criado com sucesso!');
    }
};