const productService = require('../services/productServices');

exports.createProduct = async (req, res) => {
    try {
        const product = await productService.create(req.body);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllProducts = async (req, res) => {
    const products = await productService.getAll(req.query.term);
    res.json(products);
}

exports.getProductById = async (req, res) => {
    const product = await productService.getById(req.params.id);
    res.json(product);
}

exports.updateProduct = async (req, res) => {
    const product = await productService.update(req.params.id, req.body);
    res.json(product);
}

exports.deleteProduct = async (req, res) => {
    const product = await productService.remove(req.params.id);
    res.json(product);
}

module.exports = exports;