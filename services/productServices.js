const Product = require('../models/Product');
const client = require('../elasticsearch');

exports.create = async (data) => {
    const product = new Product(data);
        await product.save();

    await client.update({
        index: 'products',
        id: product._id.toString(),
        document: {
            name: product.name,
            qty: product.qty,
            price: product.price
        }
    });

    return product;
}

exports.getAll = async (term) => {
    if (term) {
        const result = await client.search({
            index: 'products',
            query: {
                match_phrase_prefix: {
                    name: term
                }
            }
        });

        const hits = result.hits.hits;
        return hits.map(hit => ({ _id: hit._id, ...hit._source }));
    }
    return await Product.find();
}

exports.getById = async (id) => {
    return await Product.findById(id);
}

exports.update = async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (product) {
        await client.index({
            index: 'products',
            id: product._id.toString(),
            document: { name: product.name, qty: product.qty, price: product.price }
        });
    }
    return product;
}

exports.remove = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (product) {
        await client.delete({ index: 'products', id: id });
    }
    return product;
}

module.exports = exports;