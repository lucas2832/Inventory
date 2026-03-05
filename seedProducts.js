const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/inventory',);

const ProductSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number
});

const Product = mongoose.model('Product', ProductSchema);

const products = [
  { name: "Corrente de Transmissão", quantity: 25, price: 120 },
  { name: "Disco de Freio Dianteiro", quantity: 15, price: 180 },
  { name: "Disco de Freio Traseiro", quantity: 12, price: 170 },
  { name: "Cabo de Embreagem", quantity: 30, price: 45 },
  { name: "Cabo do Acelerador", quantity: 28, price: 40 },
  { name: "Vela de Ignição", quantity: 60, price: 25 },
  { name: "Filtro de Ar", quantity: 20, price: 55 },
  { name: "Filtro de Óleo", quantity: 35, price: 30 },
  { name: "Pneu Dianteiro", quantity: 10, price: 350 },
  { name: "Pneu Traseiro", quantity: 10, price: 420 },
  { name: "Bateria 12V", quantity: 14, price: 280 },
  { name: "Pastilha de Freio", quantity: 22, price: 90 },
  { name: "Kit Relação (Coroa, Pinhão e Corrente)", quantity: 8, price: 320 },
  { name: "Amortecedor Traseiro", quantity: 6, price: 450 },
  { name: "Retrovisor", quantity: 18, price: 35 },
  { name: "Manete de Freio", quantity: 16, price: 50 },
  { name: "Manete de Embreagem", quantity: 16, price: 50 },
  { name: "Guidão", quantity: 9, price: 140 },
  { name: "Farol Dianteiro", quantity: 11, price: 210 },
  { name: "Lanterna Traseira", quantity: 13, price: 95 },
  { name: "Capacete Integral", quantity: 20, price: 650 },
  { name: "Capacete Escamoteável", quantity: 12, price: 890 },
  { name: "Capacete Aberto", quantity: 18, price: 420 },
  { name: "Viseira para Capacete", quantity: 30, price: 120 },
  { name: "Luvas de Motociclista", quantity: 35, price: 150 },
  { name: "Luvas de Motocross", quantity: 22, price: 130 },
  { name: "Jaqueta de Motociclista", quantity: 15, price: 520 },
  { name: "Jaqueta Impermeável", quantity: 10, price: 480 },
  { name: "Calça de Motociclista", quantity: 12, price: 450 },
  { name: "Capa de Chuva para Motoqueiro", quantity: 25, price: 160 },
  { name: "Bota para Motociclista", quantity: 14, price: 600 },
  { name: "Tênis para Motociclista", quantity: 16, price: 380 },
  { name: "Joelheira de Proteção", quantity: 20, price: 110 },
  { name: "Cotoveleira de Proteção", quantity: 18, price: 95 },
  { name: "Protetor de Coluna", quantity: 8, price: 320 },
  { name: "Balaclava", quantity: 40, price: 45 },
  { name: "Óculos para Motocross", quantity: 17, price: 210 },
  { name: "Mochila para Motociclista", quantity: 13, price: 260 },
  { name: "Baú Traseiro para Moto", quantity: 9, price: 390 },
  { name: "Suporte para Celular na Moto", quantity: 28, price: 75 },
  { name: "Protetor de Tanque", quantity: 24, price: 60 },
  { name: "Capa para Moto", quantity: 21, price: 95 },
  { name: "Protetor de Manete", quantity: 11, price: 140 },
  { name: "Cinto Lombar para Motociclista", quantity: 19, price: 85 },
  { name: "Protetor de Joelho Articulado", quantity: 10, price: 200 }
];

async function seedDataBase() {
    
    try {
        await Product.deleteMany({});
        console.log('Existing products cleared');

        await Product.insertMany(products);
        console.log('Products seeded successfully');

        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding products:', err);
    }
}

seedDataBase();
