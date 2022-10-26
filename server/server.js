var net = require('net')
var mysql = require('mysql')


var server = net.createServer((socket) =>{
    console.log("Cliente Conectado Satisfactoriamente")
    //socket.write("\nEl cliente se conecto")
    //socket.write("\nProductos disponibles:")
    //socket.write(mostrarProductsRaw(products_raw))
    obterDatosBD(socket)
    
    socket.on('data', (data) => {
        console.log("Productos solicitados")
        console.log(data.toString())
        
    })


    socket.on('end', function(){
        console.log("El cliente se desconecto")
        socket.write("Desconectado del servidor")
    })
})
server.listen(8080, function(){
    console.log("EL servidor esta escuchando en el puerto: 8080")
    console.log("\nProductos disponibles en la base de datos")
    //console.log(mostrarProductsRaw(products_raw))
    
})



function obterDatosBD(socket) {
    var connection = mysql.createConnection({
        host: 'localhost',
        database: 'productos',
        user: 'prod',
        password: 'prod',
    });
    
    //var datos = []
    connection.connect((err) => {
        if (err) {
            console.error('Error de conexión ')
            return
        }
        console.log('Conectado con el identificador: ' + connection.threadId)
    })
    //Haciendo consultas
    connection.query('SELECT * FROM productos', (error, results, fields) => {
        if (error)
            throw error
        //Iterar la DB
        results.forEach(result =>{
            //datos.push(results['id'])
            socket.write("Producto: \r\n" +"ID: "+result['id']+"\r\n"+"Nombre: "+result['nombre']+"\r\n"+"Descripcion: "+result['descripcion']+"\r\n"+"Categoria: "+result['categoria']+"\r\n"+"Precio: "+result['precio']+"\r\n")
            //socket.write("ID: "+result['id']+"\r\n")
            //socket.write("Nombre: "+result['nombre']+"\r\n")
            //socket.write("Descripcion: "+result['descripcion']+"\r\n")
            //socket.write("Categoria: "+result['categoria']+"\r\n")
            //socket.write("Precio: "+result['precio']+"\r\n")
            //console.log(typeof result)
        })

        
    })
    connection.end()
    //Finalizar la conexion
}








/*
function mostrarProductsRaw(products_raw){
    var cadena=""
    for(let prod in products_raw["data"]){
        cadena = cadena + "ID Producto: "+products_raw["data"][prod]["id_producto"]+"\nNombre: "+products_raw["data"][prod]["nombre"]+"\nDescripcion: "+products_raw["data"][prod]["descripcion"]+"\nCategoria: "+products_raw["data"][prod]["categoria"]+"\nPrecio:"+products_raw["data"][prod]["precio"]+"\n"
    }
    return cadena
}

let products_raw = {
    data:[
        {
            id_producto: "1234",
            nombre: "Juguete1",
            descripcion: "Un armable de cocodrilo",
            categoria: "Creator",
            precio: "89",
            imagen: "https://www.gannett-cdn.com/presto/2021/11/19/USAT/cd15a425-e751-46a8-98c2-86993fcf9dce-croc.png?width=660&height=372&fit=crop&format=pjpg&auto=webp"
        },
        {
            id_producto: "1235",
            nombre: "Jueguete2",
            descripcion: "Un armable de serpiente",
            categoria: "Creator",
            precio: "49",
            imagen: "https://www.gannett-cdn.com/presto/2021/11/19/USAT/cd15a425-e751-46a8-98c2-86993fcf9dce-croc.png?width=660&height=372&fit=crop&format=pjpg&auto=webp"
        },
        {
            id_producto: "1236",
            nombre: "Juguete3",
            descripcion: "Un armable de sapo",
            categoria: "Creator",
            precio: "79",
            imagen: "https://www.gannett-cdn.com/presto/2021/11/19/USAT/cd15a425-e751-46a8-98c2-86993fcf9dce-croc.png?width=660&height=372&fit=crop&format=pjpg&auto=webp"
        },
        {
            id_producto: "1237",
            nombre: "Juguete4",
            descripcion: "Un armable de sapo",
            categoria: "Creator",
            precio: "79",
            imagen: "https://www.gannett-cdn.com/presto/2021/11/19/USAT/cd15a425-e751-46a8-98c2-86993fcf9dce-croc.png?width=660&height=372&fit=crop&format=pjpg&auto=webp"
        }
    ]
}

*/
