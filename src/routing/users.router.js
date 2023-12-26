import {Router} from 'express';
import { userController } from '../controllers/user.controller.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router =new Router();

router.get('/:idUser',jwtValidation,authMiddleware(["ADMIN"]),
    userController.getUser);

export default router;