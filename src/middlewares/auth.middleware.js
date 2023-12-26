
export const authMiddleware = (roles) => {     
    return (req, res, next) => {      
      if (roles.includes("PUBLIC")) {           
       return next();
      }      
      
      if (!roles.includes(req.user.role)) {                           
        return res.redirect("/error-login");    
    };    
    console.log('paso por aca');
    next();    
  }
};