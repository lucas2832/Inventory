import InventoryRepository from '../repositories/InventoryRepository.js'

const inventoryRepository = new InventoryRepository();

const create = async (data) => {
    return await inventoryRepository.create(data);
}

const getAll = async (term) => {
    return await inventoryRepository.findAll(term);
}

const getById = async (id) => {
    return await inventoryRepository.findById(id);
}

const update = async (id, data) => {
    return await inventoryRepository.update(id, data);
}

const remove = async (id) => {
    return await inventoryRepository.delete(id);
}

export { create, getAll, getById, update, remove };