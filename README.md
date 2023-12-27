Tercera Pre Entrega del PF  - Reestructura de nuestro servidor.
Apuntado a probarse desde el lado de postman o thunderclient.

Se adjuntó archivo BackendCoder.json con info de los nuevos endpoints y algunos de entregas anteriores para el test del poryecto.
Importante loguearse.
Los endpoints anteriores se encuentran en los archivos "thunder-collection ..." adjuntados previamente.

Pasos para probar.
Loguearse (endpoint de login http://localhost:8080/api/sessions/login) para obtener el token.
usuario de prueba : test@test.com
constraseña de prueba: 12345

Luego pueden agregarse productos al carrito y realizarse la generacion del ticket.
Caso de querer probar un nuevo carrito, se debe de utilizar otro usuario(en caso de generarlo, recordar que el rol debe ser "user" para poder agregar productos al carrito).


Endpoints:(recordar adjuntar en el header el Authorization - value: Bearer ....token.....)

Add product :http://localhost:8080/api/products
{"title":"Lapicera",
"description":"Bic",
"code":"lkj098",
"price":150,
"stock":7,
"category":"utiles",
"thumbnails":[]
}

Create User:http://localhost:8080/api/users/
 "first_name":"test ",
    "last_name": "surname_test",
    "email":"test@test.com",
    "password":"12345",
    "role":"ADMIN"

Login:http://localhost:8080/api/sessions/login
{
    "email":"test@test.com",
    "password":"12345"
}    

Purchase :http://localhost:8080/api/carts/658b3e4ac24fcef8fddd7986/purchase

Get Cart: http://localhost:8080/api/carts/658b3e4ac24fcef8fddd7986

Add product to Cart: http://localhost:8080/api/carts/658b3e4ac24fcef8fddd7986/product/6538936ada4bdeef8f482bea (recordar que solo lo puede hacer el rol "USER")

Get Ticket (para ver el ticket generado luego del purchase):http://localhost:8080/api/tickets/658b756b1b4c480b3a40374d