const mongoose = require('mongoose');
const User = require('../models/usuarioModel');
const Product = require('../models/produtoModel');
const Table = require('../models/mesaModel');
const Bill = require('../models/comandaModel');
const Order = require('../models/pedidoModel');

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb://localhost:27017/easybar', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Product.deleteMany({}),
            Table.deleteMany({}),
            Bill.deleteMany({}),
            Order.deleteMany({})
        ]);
        console.log('Cleared existing data');

        // Create admin user
        const adminUser = await User.create({
            nome: 'Administrador',
            email: 'admin@easybar.com',
            senha: 'admin123',
            tipo: 'admin',
            clerkId: 'user_2admin123',
            ativo: true
        });
        console.log('Created admin user');

        // Create waiter user
        const waiterUser = await User.create({
            nome: 'Garçom Teste',
            email: 'garcom@easybar.com',
            senha: 'garcom123',
            tipo: 'garcom',
            clerkId: 'user_2garcom123',
            ativo: true
        });
        console.log('Created waiter user');

        // Create chef user
        const chefUser = await User.create({
            nome: 'Cozinheiro Teste',
            email: 'cozinheiro@easybar.com',
            senha: 'cozinheiro123',
            tipo: 'cozinheiro',
            clerkId: 'user_2chef123',
            ativo: true
        });
        console.log('Created chef user');

        // Create tables
        const tables = await Table.insertMany([
            { numero: 1, capacidade: 4, status: 0, ativo: true },
            { numero: 2, capacidade: 6, status: 0, ativo: true },
            { numero: 3, capacidade: 2, status: 0, ativo: true },
            { numero: 4, capacidade: 8, status: 0, ativo: true },
            { numero: 5, capacidade: 4, status: 0, ativo: true }
        ]);
        console.log('Created tables');

        // Create products
        const products = await Product.insertMany([
            // Cervejas
            {
                nome: 'Heineken',
                descricao: 'Cerveja Heineken 600ml',
                categoria: 'Cervejas',
                valor: 12.00,
                ativo: true
            },
            {
                nome: 'Budweiser',
                descricao: 'Cerveja Budweiser 600ml',
                categoria: 'Cervejas',
                valor: 10.00,
                ativo: true
            },
            {
                nome: 'Corona Extra',
                descricao: 'Cerveja Corona Extra 600ml',
                categoria: 'Cervejas',
                valor: 14.00,
                ativo: true
            },
            {
                nome: 'Stella Artois',
                descricao: 'Cerveja Stella Artois 600ml',
                categoria: 'Cervejas',
                valor: 13.00,
                ativo: true
            },
            {
                nome: "Beck's",
                descricao: 'Cerveja Beck\'s 600ml',
                categoria: 'Cervejas',
                valor: 11.00,
                ativo: true
            },
            // Doses
            {
                nome: 'Jack Daniel\'s',
                descricao: 'Whisky Jack Daniel\'s 50ml',
                categoria: 'Doses',
                valor: 25.00,
                ativo: true
            },
            {
                nome: 'Ypióca',
                descricao: 'Cachaça Ypióca 50ml',
                categoria: 'Doses',
                valor: 15.00,
                ativo: true
            },
            {
                nome: 'Absolut Vodka',
                descricao: 'Vodka Absolut 50ml',
                categoria: 'Doses',
                valor: 20.00,
                ativo: true
            },
            {
                nome: 'Tanqueray Gin',
                descricao: 'Gin Tanqueray 50ml',
                categoria: 'Doses',
                valor: 25.00,
                ativo: true
            },
            {
                nome: 'Baileys',
                descricao: 'Licor Baileys 50ml',
                categoria: 'Doses',
                valor: 20.00,
                ativo: true
            },
            // Sem Álcool
            {
                nome: 'Coca-Cola 1L',
                descricao: 'Refrigerante Coca-Cola 1L',
                categoria: 'Sem Álcool',
                valor: 8.00,
                ativo: true
            },
            {
                nome: 'Guaraná Antarctica 2L',
                descricao: 'Refrigerante Guaraná Antarctica 2L',
                categoria: 'Sem Álcool',
                valor: 12.00,
                ativo: true
            },
            {
                nome: 'Suco de Laranja Natural',
                descricao: 'Suco de Laranja Natural 500ml',
                categoria: 'Sem Álcool',
                valor: 10.00,
                ativo: true
            },
            {
                nome: 'Suco de Uva Garrafinha',
                descricao: 'Suco de Uva 300ml',
                categoria: 'Sem Álcool',
                valor: 8.00,
                ativo: true
            },
            {
                nome: 'Red Bull',
                descricao: 'Bebida Energética Red Bull 250ml',
                categoria: 'Sem Álcool',
                valor: 12.00,
                ativo: true
            },
            // Drinks
            {
                nome: 'Caipirinha',
                descricao: 'Drink Caipirinha com Limão',
                categoria: 'Drinks',
                valor: 20.00,
                ativo: true
            },
            {
                nome: 'Caipvodka',
                descricao: 'Drink Caipvodka com Limão',
                categoria: 'Drinks',
                valor: 22.00,
                ativo: true
            },
            {
                nome: 'Gin Tônica',
                descricao: 'Drink Gin Tônica com Limão',
                categoria: 'Drinks',
                valor: 25.00,
                ativo: true
            },
            {
                nome: 'Negroni',
                descricao: 'Drink Negroni Clássico',
                categoria: 'Drinks',
                valor: 28.00,
                ativo: true
            },
            {
                nome: 'Martini',
                descricao: 'Drink Martini Clássico',
                categoria: 'Drinks',
                valor: 25.00,
                ativo: true
            },
            {
                nome: 'Cozumel',
                descricao: 'Drink Cozumel Especial',
                categoria: 'Drinks',
                valor: 30.00,
                ativo: true
            },
            // Petiscos
            {
                nome: 'Batata Frita',
                descricao: 'Porção de Batata Frita',
                categoria: 'Petiscos',
                valor: 18.00,
                ativo: true
            },
            {
                nome: 'Cebola Frita',
                descricao: 'Porção de Cebola Frita',
                categoria: 'Petiscos',
                valor: 16.00,
                ativo: true
            },
            {
                nome: 'Torresmo',
                descricao: 'Porção de Torresmo',
                categoria: 'Petiscos',
                valor: 20.00,
                ativo: true
            },
            {
                nome: 'Frango Frito',
                descricao: 'Porção de Frango Frito',
                categoria: 'Petiscos',
                valor: 25.00,
                ativo: true
            },
            {
                nome: 'Filé de Tilápia',
                descricao: 'Filé de Tilápia Frito',
                categoria: 'Petiscos',
                valor: 30.00,
                ativo: true
            },
            {
                nome: 'Frios Variados',
                descricao: 'Tábua de Frios Variados',
                categoria: 'Petiscos',
                valor: 35.00,
                ativo: true
            },
            {
                nome: 'Tábua Quente',
                descricao: 'Tábua de Petiscos Quentes',
                categoria: 'Petiscos',
                valor: 40.00,
                ativo: true
            },
            {
                nome: 'Cenourinha',
                descricao: 'Porção de Cenoura em Palitos',
                categoria: 'Petiscos',
                valor: 12.00,
                ativo: true
            }
        ]);
        console.log('Created products');

        // Create a sample bill
        const bill = await Bill.create({
            status: 1,
            dono: waiterUser.clerkId,
            mesa: 1, // Using table number instead of _id
            valorTotal: 0,
            formaPagamento: null,
            ativo: true,
            produtos: [] // Initialize empty produtos array
        });
        console.log('Created sample bill');

        // Add sample products to the bill
        bill.produtos.push({
            produto: products[0]._id, // Heineken
            quantidade: 2,
            valor: products[0].valor,
            observacoes: 'Sem gelo',
            status: 'pendente'
        });

        bill.produtos.push({
            produto: products[5]._id, // Jack Daniel's
            quantidade: 1,
            valor: products[5].valor,
            observacoes: 'Com gelo',
            status: 'pendente'
        });

        // Calculate bill total
        await bill.calcularTotal();
        await bill.save();
        console.log('Calculated bill total');

        console.log('Seed completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 