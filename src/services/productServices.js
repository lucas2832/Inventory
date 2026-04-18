import Product from '../models/Product.js';
import {update as _update, search, index as _index, remove as _remove} from '../../elasticsearch.js';

const create = async (data) => {
    const product = new Product(data);
    await product.save();

    await _index({
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

const getAll = async (term) => {
    if (term) {
        const result = await search({
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
    return Product.find();
}

const getById = async (id) => {
    return Product.findById(id);
}

const update = async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });

    if (product) {
        await _index({
            index: 'products',
            id: product._id.toString(),
            document: { name: product.name, qty: product.qty, price: product.price }
        });
    }
    return product;
}

const remove = async (id) => {
    const product = await Product.findByIdAndDelete(id);

    if (product) {
        await _remove({ index: 'products', id: id });
    }
    return product;
}

export { create, getAll, getById, update, remove };