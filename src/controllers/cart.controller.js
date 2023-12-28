import { cartsManager } from '../dao/models/mongoose/CartsManager.js';
import { cartService } from '../services/carts.service.js';
import CustomError from '../errors/error.generator.js';
import { ErrorsMessages,ErrorsName } from '../errors/error.enum.js';


const addCart =  async (req, res) => {
    try {
        const newCart = await cartsManager.createCart();
        res.status(200).json({ status:"success",message: 'Cart created', cart: newCart });
    } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}

const getById=  async (req, res) => {
    const { cid } = req.params;
    try {
        const cart = await cartsManager.getCartById(cid);
        if (!cart) {
            CustomError.generateErrorMessage(ErrorsMessages.CART_NOT_FOUND,404,ErrorsName.CART_NOT_FOUND);        
        }
        res.status(200).json({ message: 'Cart found', cart });

    } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}

const addProductToCart= async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const newProduct = await cartsManager.addProductToCart(cid, pid);
        // res.status(200).json({ message: 'Product added to cart', product: newProduct });
        res.json("todp ok");
    } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}

const deleteProduct = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const deleteProduct = await cartsManager.removeProductToCart(cid, pid);
        res.status(200).json({ message: 'Product remove to cart', product: deleteProduct });

    } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}


const deleteAllProducts= async (req, res) => {
    const { cid} = req.params;

    try {
        const deleteProduct = await cartsManager.removeAllProductsToCart(cid);
        res.status(200).json({ message: 'Products removed to cart', product: deleteProduct });

    } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}


const updateProductToCart = async (req, res) => {
    const { cid,pid } = req.params;
    const {quantity } = req.body;

    try {
        const updateResult = await cartsManager.updateQuantityProduct(cid,pid,quantity);

        if (updateResult) {            
            // Devuelve el producto actualizado en la respuesta
            res.status(200).json({ message: 'Product updated', product: updateResult });
        } else {
            // En caso de que no se encuentre el producto para actualizar
            CustomError.generateErrorMessage(ErrorsMessages.PRODUCT_NOT_FOUND,404,ErrorsName.PRODUCT_NOT_FOUND);        
        }
    } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}


const updateAllProducts= async (req, res) => {
    const { cid} = req.params;
    const {products } = req.body;

    try {
        const updatedCart = await cartsManager.updateAllProducts(cid, products);        
        res.status(200).json({ message: 'Products updated', cart: updatedCart });
    }
    catch (error){
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);        
    }
}

const getPurchase= async(req, res)=>{
    const {cid} = req.body;
   
    const response = await cartService.purchase(cid,req.cookies.token);
    
    res.json({data: response});
}


export const cartController={
    "addCart":addCart,
    "getById":getById,
    "addProductToCart":addProductToCart,
    "deleteProduct":deleteProduct,
    "deleteAllProducts":deleteAllProducts,
    "updateProductToCart":updateProductToCart,
    "updateAllProducts":updateAllProducts,
    "getPurchase":getPurchase
}

// export default router;