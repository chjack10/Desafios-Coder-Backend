import { Router } from 'express';
import { renderfailedSignupView } from '../controllers/failedSignup.controller';

const router: Router = Router();

router.get('/', renderfailedSignupView);

export default router;
