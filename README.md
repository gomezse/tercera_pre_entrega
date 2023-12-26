Entregable Clase 27 - Reestructura de nuestro servidor.

usuario cargado 1:
email :"prueba@prueba.com"
password:123
role:"ADMIN"

usuario cargado 2:
email :"prueba2@prueba2.com"
password:123
role:"USER"

usuario cargado 3:
email :"prueba3@prueba3.com"
password:123
role:"PREMIUM"

usuario cargado 4:
email :"gomezsebastian909@gmail.com"
password:12345
role:"ADMIN"

usuario cargado 5:
email :"t@gmail.com"
password:12345
role:"ADMIN"


ENDPOINTS:
http://localhost:8080/signup
http://localhost:8080/login

IMPORTANTE: si no se ingresa mediante el login, el token no se genera, por lo tanto, siempre dará como msj "acceso no autorizado"
http://localhost:8080/api/sessions/current (Si el usuario no tiene el rol ADMIN lleva a la vista de error de login, caso contrario devuelve objeto con info del usuario).

VALIDACION DE ROLE EN MIDDLEWARE auth.middleware.js



Patron MVC
modelo-> carpetas: models ,dao
vista-> carpetas:view,routing
controlador-> carpeta:controllers

carpeta services: prueba con clase de userController. La idea es descargar logica innecesaria al controler ( a modo prueba para la entidad User, la idea es extenderla al resto de entidades). Por lo tanto, en caso de estar implementado, funciona como puente entre el controller y el dao.

carpeta utils: contiene varios archivos sobre configuracion (commander,process,passport...)



