// Solo para cumplir con la consigna de la entrega
import { Router } from 'express';
import { getRandomProduct } from '../controllers/products';

const router: Router = Router();

router.get('/', getRandomProduct);

export default router;
