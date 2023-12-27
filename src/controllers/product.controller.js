import { productsManager } from '../dao/models/mongoose/ProductsManager.js';


const getAll = async (req, res) => {
    try {
        const info = await productsManager.findAll(req.query);

        if (!info.payload.length) {
            return res.status(200).json({ message: 'No products' });
        }

        res.status(200).json({ message: 'Products found', info });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productsManager.findById(pid);
        if (!product) {
            return res.status(404).json({ message: `No product found with that id ${pid} ` });
        }
        res.status(200).json({ message: 'Product found', product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addProduct= async (req, res) => {
    const { title, description, code, price, stock, category, thumbnails, status } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ message: `Required data is misssing` });
    }

    try {
        
        const newProduct = await productsManager.createOne(req.body);
        // console.log("new product",newProduct);
        if (newProduct.code === 11000) {

            res.status(400).json({ message: `Product with code duplicated: ${newProduct.keyValue.code}`, product: newProduct });
        }
        res.status(200).json({ message: 'Product created', product: newProduct });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteProduct = async (req, res) => {
    const { pid } = req.params;
    try {
        const deletedProduct = await productsManager.deleteOne(pid)
        res.status(200).json({ message: 'Product deleted', deletedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct =  async (req, res) => {
    const { pid } = req.params;

    try {
        const updateResult = await productsManager.updateOne({ _id: pid }, req.body);

        if (updateResult.matchedCount === 1) {
            const updatedProduct = await productsManager.findById(pid);
            // Devuelve el producto actualizado en la respuesta
            res.status(200).json({ message: 'Product updated', product: updatedProduct });
        } else {
            // En caso de que no se encuentre el producto para actualizar
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const productController ={
    "getAll":getAll,
    "getById":getById,
    "addProduct":addProduct,
    "deleteProduct":deleteProduct,
    "updateProduct":updateProduct
}