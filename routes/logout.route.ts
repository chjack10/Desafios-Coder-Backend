import { Router } from 'express';
import { logout } from '../controllers/logout.controller';

const router: Router = Router();

router.get('/', logout);

export default router;
