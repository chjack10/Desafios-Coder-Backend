import { Router } from 'express';
import { renderHomeView } from '../controllers/home.controller';

const router: Router = Router();

router.get('/', renderHomeView);

export default router;
