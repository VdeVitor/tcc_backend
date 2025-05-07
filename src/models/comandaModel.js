const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    status: {
        type: Number,
        default: 1,
        enum: [0, 1, 2] // 0: fechada, 1: aberta, 2: cancelada
    },
    dono: {
        type: String,
        required: true
    },
    mesa: {
        type: Number,
        required: true
    },
    produtos: [{
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            min: 1
        },
        valor: {
            type: Number,
            required: true
        },
        observacoes: {
            type: String
        },
        status: {
            type: String,
            enum: ['pendente', 'preparando', 'pronto', 'entregue'],
            default: 'pendente'
        }
    }],
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
    this.valorTotal = this.produtos.reduce((total, item) => {
        return total + (item.valor * item.quantidade);
    }, 0);
    await this.save();
};

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;