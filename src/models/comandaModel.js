const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0: fechada, 1: aberta, 2: cancelada
    },
    dono: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    valorTotal: {
        type: Number,
        default: 0
    },
    formaPagamento: {
        type: String,
        enum: ['dinheiro', 'cartao_credito', 'cartao_debito', 'pix', null],
        default: null
    },
    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual populate orders
billSchema.virtual('pedidos', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'comanda'
});

// Method to calculate total value
billSchema.methods.calcularTotal = async function() {
    const Order = mongoose.model('Order');
    const orders = await Order.find({ comanda: this._id });
    this.valorTotal = orders.reduce((total, order) => total + (order.valor * order.quantidade), 0);
    await this.save();
};

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;