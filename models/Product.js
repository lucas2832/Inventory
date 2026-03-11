import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: String,
    qty: Number,
    price: Number
});

export default model('Product', ProductSchema);