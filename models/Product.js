const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    price: Number
});

module.exports = mongoose.model('Product', ProductSchema);