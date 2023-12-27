import config from "../utils/config.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (roles) => {     
  return (req, res, next) => {    
  
  const user = jwt.verify(req.rawHeaders[1].split(' ')[1], config.secretKeyJWT);
  req.user = user;   
  if (!user){
    return res.status(401).json({message:"Unauthorized"});
  }  
  
  if(roles && !roles.includes(user.role)) {
    return res.status(403).json({message:"Forbidden"});
  }

  next();    
}
};