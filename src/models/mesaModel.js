const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
        unique: true
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2] // 0: livre, 1: ocupada, 2: reservada
    },
    capacidade: {
        type: Number,
        required: true
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Table = mongoose.model('Table', tableSchema);

module.exports = Table;