import { Router } from "express";
import { viewRouter } from "../controllers/view.controller.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();

router.get(`/`,authMiddleware("USER"), viewRouter.chat);
router.get(`/products`,viewRouter.products);
router.get(`/carts/:cid`,viewRouter.cartId);
router.get("/login",viewRouter.login);
router.get("/signup",viewRouter.signup);
router.get("/profile",viewRouter.profile);
router.get("/restaurar",jwtValidation,viewRouter.restaurar);
router.get("/error",viewRouter.error);
router.get("/error-login",viewRouter.errorLogin);

export default router;