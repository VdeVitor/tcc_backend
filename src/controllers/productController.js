const Product = require('../models/produtoModel');

module.exports = {
    async getProd(req, res) {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getProdById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async createProd(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: 'Please fill all required fields!' });
            }
            const product = new Product(req.body);
            const newProduct = await product.save();
            res.status(201).json({ success: true, message: 'Product created successfully!', data: newProduct });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    async editProd(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ success: false, message: 'Please fill all required fields!' });
            }
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            res.json({ success: true, message: 'Product updated successfully!', data: product });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    async deleteProd(req, res) {
        try {
            const product = await Product.findByIdAndDelete(req.params.id);
            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            res.json({ success: true, message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};
