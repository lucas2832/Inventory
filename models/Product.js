import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true }
});

const Product = model("Product", ProductSchema);

export default Product;