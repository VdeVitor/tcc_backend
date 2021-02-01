const connection = require("../database/connection");

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const user = await connection('users').where('id', id).select('name').first();


        if(!user) {
            return response.status(400).json({ error: 'Usuário não encontrado.' });
        }

        return response.json(user);
    }
}