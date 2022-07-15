import { Router } from 'express';

import { renderSignUpView, signUp } from '../controllers/signup.controller';

const router: Router = Router();

router.get('/', renderSignUpView);
router.post('/', signUp);

export default router;
