import { Router } from 'express';
import { renderfailedLoginView } from '../controllers/failedLogin.controller';

const router: Router = Router();

router.get('/', renderfailedLoginView);

export default router;
