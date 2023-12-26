import { Router } from 'express';
import {cartController } from "../controllers/cart.controller.js";

const router = Router();

router.post("/",cartController.addCart);
router.get("/:cid",cartController.getById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/products/:pid", cartController.deleteProduct);
router.delete("/:cid",cartController.deleteAllProducts);
router.put("/:cid/products/:pid",cartController.updateProductToCart);
router.put("/:cid", cartController.updateAllProducts);


export default router;