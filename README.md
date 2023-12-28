Tercera Pre Entrega del PF  - Reestructura de nuestro servidor.


Para testear desde el FRONT
 
1) ejecutar http://localhost:8080/api/sessions/signout (limpiar cookies);
2) acceder al signup : "http://localhost:8080/signup";
3) registrarte de manera local
4) una vez generado el user acceder a "http://localhost:8080/login"
5) loguearse con el mail y password  del item 3
6) esto arrojara el msj con el token generado.
7) acceder al profile: "http://localhost:8080/profile";

En el profile esta el listado de productos. Cada producto tiene un boton de agregar al carrito.
Al principio hay un link que permite ver el contenido del carrito con el user que se encuentra logueado.
Debajo de este link se encuentra un boton para generar el ticket una vez que se hayan agregado productos al carrito.

ACLARACIONES:
Al loguearse manualmente en el archivo .env.production, se puede setear el rol que se desea tener con el usuario (para probar los middlewares de autorización);
Cada vez que se agrega un producto al carrito se refresca la pagina automaticamente luego del "alert()"
Cada vez que se crea un ticketse refresca la pagina automaticamente luego del "alert()"





