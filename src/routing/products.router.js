import { Router } from "express";
import {productController } from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/",productController.getAll);
router.get("/mockingproducts",productController.getMockingProducts);
router.get("/:pid",productController.getById);
router.post("/",authMiddleware("ADMIN"),productController.addProduct);
router.delete("/:pid",authMiddleware("ADMIN"),productController.deleteProduct);
router.put("/:pid",authMiddleware("ADMIN"),productController.updateProduct);


export default router;