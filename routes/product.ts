import { Router } from 'express';
import {
  deleteProduct,
  getProduct,
  getRandomProduct,
  postProduct,
  putProduct,
  getProducts,
} from '../controllers/products';

const router: Router = Router();

router.get('/', getProducts);
router.get('/productoRandom', getRandomProduct);
router.get('/:id', getProduct);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

export default router;
