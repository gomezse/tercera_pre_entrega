import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.js";
const SECRET_KEY_JWT = "secretJWT";

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (data) => {
    return bcrypt.hash(data, 10);
  };
  
  export const compareData = async (data, hashedData) => {
    return bcrypt.compare(data, hashedData);
  };
  
  export const generateToken = (user) => {
    const token = jwt.sign(user, config.secretKeyJWT, { expiresIn: 3000 });
    console.log("token generado: ", token);
    return token;
  };