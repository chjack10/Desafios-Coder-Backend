import { Router } from 'express';
import { getRandomNumbers } from '../controllers/randoms.controller';

const router: Router = Router();

router.get('/', getRandomNumbers);

export default router;
