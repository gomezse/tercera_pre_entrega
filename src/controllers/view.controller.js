import { productsManager } from "../dao/models/mongoose/ProductsManager.js"
import { cartsManager } from "../dao/models/mongoose/CartsManager.js";
import { usersManager } from "../dao/models/mongoose/UsersManager.js";
import config from "../utils/config.js";
import jwt from "jsonwebtoken";

const chat =async (req, res) => {
    const products = await productsManager.findAll(req.query);
    res.render("chat",{products,style:'index'});
  
  }


const products = async (req, res) => {
    const products = await productsManager.findAll(req.query);
    const {payload,totalPages,page,nextLink,prevLink,hasNextPage,hasPrevPage}=products;
    const productsObject = payload.map(product => product.toObject());

    res.render('home', { product : productsObject,page:page,next:nextLink,prev:prevLink,hasNext:hasNextPage,hasPrev:hasPrevPage,totalPages:totalPages });
  
  }

const cartId=  async (req, res) => {
    const {cid}=req.params;
    const cart = await cartsManager.getCartById(cid);
    const cartObject = cart.products.map(product => product.toObject());
  
    res.render('cart', { cart : cartObject});
  };

const login = (req, res) => {    
    if (req && req.cookies.user) {
        return res.redirect("/profile");
    }
    res.render("login");
};

const signup = (req, res) => {
    if (req.cookies.token) {
        return res.redirect("/profile");
    }
    res.render("signup");
}

const profile = async (req, res) => {
    
    if (!req.cookies.token) {
         
        return res.redirect("/login");
    }
    const user = jwt.verify(req.cookies.token, config.secretKeyJWT);
    // const user = await  usersManager.findById(req.session.passport.user);        
    const products = await productsManager.findAll(req.query);
   
    if (!products.payload.length) {
        return res.status(200).json({ message: 'No products' });
    } 
  
    const { payload } = products;
    
    
    const productsObject = payload.map(product => product.toObject());
    res.render("profile", { products: productsObject, user: req.user?req.user:user });
}

const restaurar =  (req, res) => {
    res.render("restaurar");
  };
  

const error= (req, res) => {
    const message = req;

    res.render("error",{message:message});
}

const errorLogin=(req, res) => {
    const message = req;
    res.render("error_login",{message:message});
  }

const message= (req, res) => {
    res.render("messages");
}  

export const viewRouter = {
    "chat":chat,
    "products":products,
    "cartId":cartId,
    "login":login,
    "signup":signup,
    "profile":profile,
    "restaurar":restaurar,
    "error":error,
    "errorLogin":errorLogin,
    "message":message
}