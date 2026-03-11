import { create, getAll, getById, update, remove } from '../services/productServices.js';

const createProduct = async (req, res) => {
    try {
        const product = await create(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllProducts = async (req, res) => {
    const products = await getAll(req.query.term);
    res.json(products);
}

const getProductById = async (req, res) => {
    const product = await getById(req.params.id);
    res.json(product);
}

const updateProduct = async (req, res) => {
    const product = await update(req.params.id, req.body);
    res.json(product);
}

const deleteProduct = async (req, res) => {
    const product = await remove(req.params.id);
    res.json(product);
}

export default { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };