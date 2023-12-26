import { Router } from "express";
import {productController } from "../controllers/product.controller.js";

const router = Router();

router.get("/",productController.getAll);
router.get("/:pid",productController.getById);
router.post("/",productController.addProduct);
router.delete("/:pid",productController.deleteProduct);
router.put("/:pid",productController.updateProduct);

export default router;