const Product = require('../models/Product');

exports.create = async (data) => {
    const product = new Product(data);
    return await product.save();
}

exports.getAll = async () => {
    return await Product.find();
}

exports.getById = async (id) => {
    return await Product.findById(id);
}

exports.update = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
}

exports.remove = async (id) => {
    return await Product.findByIdAndDelete(id);
}

module.exports = exports;