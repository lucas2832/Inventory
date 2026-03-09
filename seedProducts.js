const mongoose = require('mongoose');
const client = require('./elasticsearch');

mongoose.connect('mongodb://localhost:27017/inventory',);

const ProductSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number
});

const Product = mongoose.model('Product', ProductSchema);

const products = [
  { name: "Corrente de Transmissão", qty: 25, price: 120 },
  { name: "Disco de Freio Dianteiro", qty: 15, price: 180 },
  { name: "Disco de Freio Traseiro", qty: 12, price: 170 },
  { name: "Cabo de Embreagem", qty: 30, price: 45 },
  { name: "Cabo do Acelerador", qty: 28, price: 40 },
  { name: "Vela de Ignição", qty: 60, price: 25 },
  { name: "Filtro de Ar", qty: 20, price: 55 },
  { name: "Filtro de Óleo", qty: 35, price: 30 },
  { name: "Pneu Dianteiro", qty: 10, price: 350 },
  { name: "Pneu Traseiro", qty: 10, price: 420 },
  { name: "Bateria 12V", qty: 14, price: 280 },
  { name: "Pastilha de Freio", qty: 22, price: 90 },
  { name: "Kit Relação (Coroa, Pinhão e Corrente)", qty: 8, price: 320 },
  { name: "Amortecedor Traseiro", qty: 6, price: 450 },
  { name: "Retrovisor", qty: 18, price: 35 },
  { name: "Manete de Freio", qty: 16, price: 50 },
  { name: "Manete de Embreagem", qty: 16, price: 50 },
  { name: "Guidão", qty: 9, price: 140 },
  { name: "Farol Dianteiro", qty: 11, price: 210 },
  { name: "Lanterna Traseira", qty: 13, price: 95 },
  { name: "Capacete Integral", qty: 20, price: 650 },
  { name: "Capacete Escamoteável", qty: 12, price: 890 },
  { name: "Capacete Aberto", qty: 18, price: 420 },
  { name: "Viseira para Capacete", qty: 30, price: 120 },
  { name: "Luvas de Motociclista", qty: 35, price: 150 },
  { name: "Luvas de Motocross", qty: 22, price: 130 },
  { name: "Jaqueta de Motociclista", qty: 15, price: 520 },
  { name: "Jaqueta Impermeável", qty: 10, price: 480 },
  { name: "Calça de Motociclista", qty: 12, price: 450 },
  { name: "Capa de Chuva para Motoqueiro", qty: 25, price: 160 },
  { name: "Bota para Motociclista", qty: 14, price: 600 },
  { name: "Tênis para Motociclista", qty: 16, price: 380 },
  { name: "Joelheira de Proteção", qty: 20, price: 110 },
  { name: "Cotoveleira de Proteção", qty: 18, price: 95 },
  { name: "Protetor de Coluna", qty: 8, price: 320 },
  { name: "Balaclava", qty: 40, price: 45 },
  { name: "Óculos para Motocross", qty: 17, price: 210 },
  { name: "Mochila para Motociclista", qty: 13, price: 260 },
  { name: "Baú Traseiro para Moto", qty: 9, price: 390 },
  { name: "Suporte para Celular na Moto", qty: 28, price: 75 },
  { name: "Protetor de Tanque", qty: 24, price: 60 },
  { name: "Capa para Moto", qty: 21, price: 95 },
  { name: "Protetor de Manete", qty: 11, price: 140 },
  { name: "Cinto Lombar para Motociclista", qty: 19, price: 85 },
  { name: "Protetor de Joelho Articulado", qty: 10, price: 200 }
];

async function seedDataBase() {
    
    try {
        await Product.deleteMany({});
        console.log('Existing products cleared from MongoDB');

        const { body: exists } = await client.indices.exists({ index: 'products' });
        if (exists) {
            await client.indices.delete({ index: 'products' });
            console.log('Existing index "products" cleared from Elasticsearch');
        }

        const createdProducts = await Product.insertMany(products);
        console.log('Products seeded successfully to MongoDB');

        const body = createdProducts.flatMap(doc => [
            { index: { _index: 'products', _id: doc._id.toString() } },
            { name: doc.name, qty: doc.qty, price: doc.price }
        ]);

        if (body.length > 0) {
            await client.bulk({ refresh: true, body });
            console.log('Products indexed successfully to Elasticsearch');
        }

        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding products:', err);
    }
}

seedDataBase();
