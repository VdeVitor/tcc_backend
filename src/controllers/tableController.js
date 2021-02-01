const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const tables = await connection('table').select('*');

        return response.json(tables);
    },

    async create(request, response) {
        const {number, status} = request.body;

        const [id] = await connection('table').insert({
            number, 
            status
        });

        return response.json({ id });
    }

};