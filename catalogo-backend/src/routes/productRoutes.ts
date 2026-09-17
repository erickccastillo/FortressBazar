import { Router } from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

// ... tus otras rutas ...


const router = Router();
router.delete('/:id', deleteProduct); // DELETE /api/clothes/:id
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);

export default router;