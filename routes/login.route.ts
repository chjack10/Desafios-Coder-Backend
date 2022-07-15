import { Router } from 'express';
import { renderLoginView } from '../controllers/login.controller';

const router: Router = Router();

router.get('/', renderLoginView);

export default router;
