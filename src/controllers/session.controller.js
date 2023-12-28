
import { hashData, compareData, generateToken } from "../utils/utils.js";
import { usersManager } from "../dao/models/mongoose/UsersManager.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import CustomError from '../errors/error.generator.js';
import { ErrorsMessages,ErrorsName } from '../errors/error.enum.js';
import { cartsManager } from "../dao/models/mongoose/CartsManager.js";
import config from "../utils/config.js";


const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  try {
    const hashedPassword = await hashData(password);
    const cart = await cartsManager.createCart();
    const createdUser = await usersManager.createOne({
      ...req.body,
      password: hashedPassword,
      role: config.rolUser,
      cart:cart._id
    });
    
    res.status(200).json({ message: "Usuario creado", user: createdUser });
  } catch (error) {
    CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);      
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/signup");
    }    
    const isPasswordValid = await compareData(password, user.password);
    if (!isPasswordValid) {
      CustomError.generateErrorMessage(ErrorsMessages.INVALID_PASSWORD,401,ErrorsName.INVALID_PASSWORD);   
    }
  
    //jwt
    const { first_name, last_name, role ,cart} = user;
    const token = generateToken({ first_name, last_name, email, role ,cart});
   
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Bienvenido a la pagina: ", token });
  } catch (error) {
    res.status(500).json({ error });
  }
}
const callback = passport.authenticate("github", {
  successRedirect: "/profile", 
  failureRedirect: "/error" 
});
const authGit = passport.authenticate("github", { scope: ["user:email"] });

const authGoogle = passport.authenticate("google", { scope: ["profile", "email"] });

const callbackGoogle= passport.authenticate("google", {
  successRedirect: "/profile", 
  failureRedirect: "/error" 
});

const signout = (req, res) => {

  // req.session.destroy(() => {
  //   res.redirect("/login");
  // });
//con cookies
  res.clearCookie('token'); 
  res.redirect("/login");
}

const current = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err,jwt_payload) => {
    if (err) {      
      CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);  
      
    }

    if (!jwt_payload) {      
      CustomError.generateErrorMessage(ErrorsMessages.ErrorsName.INVALID_CREDENTIALS,401,ErrorsName.INVALID_CREDENTIALS);      
    }

    req.user = jwt_payload;    
    // authMiddleware(["ADMIN"])(req, res, async () => {
    authMiddleware(["ADMIN","PUBLIC"])(req, res, async () => {
      try {

        res.json({ message: req.user });
      } catch (error) {
        CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);      
      }
    });
  })(req, res, next);
};


const restaurar =  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    CustomError.generateErrorMessage(ErrorsMessages.ERROR_INTERNAL,500,ErrorsName.ERROR_INTERNAL);   
  }
}

export const  sessionController ={
    "signup":signup,
    "login":login,
    "authGit":authGit,
    "callback":callback,
    "authGoogle":authGoogle,
    "callbackGoogle":callbackGoogle,
    "signout":signout,
    "current":current,
    "restaurar":restaurar
};




