
import { hashData, compareData, generateToken } from "../utils/utils.js";
import { usersManager } from "../dao/models/mongoose/UsersManager.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const signup = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  try {
    const hashedPassword = await hashData(password);
    const createdUser = await usersManager.createOne({
      ...req.body,
      password: hashedPassword,
      role: "PREMIUM",
    });
    res.status(200).json({ message: "Usuario creado", user: createdUser });
  } catch (error) {
    res.status(500).json({ error });
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
      return res.status(401).json({ message: "Contraseña no válida" });
    }
  
    //jwt
    const { first_name, last_name, role } = user;
    const token = generateToken({ first_name, last_name, email, role });
    
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ message: "Bienvenido a la pagina: ", token });
  } catch (error) {
    console.log(error);
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
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

const current = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err,jwt_payload) => {
    if (err) {      
      return res.status(500).json({ error: 'Error en autenticación' });
    }

    if (!jwt_payload) {      
      return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    req.user = jwt_payload;    
    // authMiddleware(["ADMIN"])(req, res, async () => {
    authMiddleware(["ADMIN","PUBLIC"])(req, res, async () => {
      try {

        res.json({ message: req.user });
      } catch (error) {
        res.status(500).json({ error: 'Error en función async' });
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
    res.status(500).json({ error });
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




