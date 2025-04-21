const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3] // 0: pendente, 1: em preparo, 2: pronto, 3: entregue
    },
    valor: {
        type: Number,
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        min: 1
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    comanda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: true
    },
    observacoes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

