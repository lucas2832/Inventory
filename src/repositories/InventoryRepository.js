import Product from '../models/Product.js';
import RepositoryInterface from './interfaces/RepositoryInterface.js';
import { index as _index, search, remove as _remove } from '../../elasticsearch.js';

class InventoryRepository extends RepositoryInterface {

    async create(data) {
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

    async findAll(term) {
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

    async findById(id) {
        return Product.findById(id);
    }

    async update(id, data) {
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

    async delete(id) {
        const product = await Product.findByIdAndDelete(id);

        if (product) {
            await _remove({ index: 'products', id: id });
        }
        return product;
    }
}

export default InventoryRepository;