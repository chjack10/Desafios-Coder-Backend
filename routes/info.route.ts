import { Router } from 'express';
import { renderInfoView } from '../controllers/info.controller';

const router: Router = Router();

router.get('/', renderInfoView);

export default router;
