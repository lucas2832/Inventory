import { Router } from 'express';
const router = Router();

import productsController from '../controllers/productController.js';

router.post('/', productsController.createProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

export default router;