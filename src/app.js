import express from 'express'; //importo la libreria de express
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import morgan from 'morgan';
import { getDirname } from "./utils/dirname.js";
import { Server } from "socket.io";
import handlebars from 'express-handlebars';
import realtimeRoutes from './routes/realtime.routes.js'
import { connectDB } from './db/connection.js';
import {insertTestProducts} from './data/dataLoader.js';




//colores para logs en la consola
const colores = {
    reset: "\x1b[0m",
    info: "\x1b[34m", //azul
    succes: "\x1b[32m", //verde
    warning: "\x1b[33m", //amarillo
    error: "\x1b[31m", //rojo
};

//Instancio express y el puerto
const app = express();
const PORT = 8080;
const __dirname = getDirname(import.meta.url); //instancio dirname para armar las rutas absolutas


//Middleware para parsear JSON
app.use(express.json()); //este es para mandar objetos complejos en JSON y que los entienda...
app.use(express.urlencoded({extended: true})); //esto convierte datos accesibles a traves de req.body en true objetos complejos, si es false no soporta objetos complejos
app.use(morgan("tiny"));

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("views",__dirname + "/views");
app.set("view engine", "handlebars");

//Rutas principales
//app.use("/api/users", userRouter); //Esto todavia no lo uso
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);


//paginas publicas
app.use("/",express.static(__dirname + "/public"));//direccion a la carpeta static
app.use("/products/realtimeProducts", realtimeRoutes); //linkeo ROUTES

//Conecto con la Base de datos
connectDB();

//listener del puerto
const httpServer = app.listen(PORT, () => {
    console.log(`${colores.info}✅ Servidor escuchando en el puerto: ${PORT}`);
});

//wraper de websocket
const io = new Server(httpServer);


io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    // Función para obtener productos desde el API
    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/products");
            const data = await response.json();
            return data.payload.docs; // Ajusta según el formato de la respuesta de paginate
        } catch (error) {
            console.error("Error obteniendo productos:", error);
            return [];
        }
    };

    // Enviar la lista inicial de productos al cliente
    const products = await fetchProducts();
    socket.emit("productList", products);

    // Escuchar si se agrega un nuevo producto y actualizar la lista
    socket.on("newProductAdded", async () => {
        const updatedProducts = await fetchProducts();
        io.emit("productList", updatedProducts);
    });
});



//actualizar la lista después de un POST en products.routes.js
app.use((req, res, next) => {
    res.on("finish", async () => {
        if (req.method === "POST" && req.baseUrl === "/products") {
            const updatedProducts = await loadProducts();
            io.emit("productList", updatedProducts); // Emitir la lista actualizada
        }
    });
    next();
});


// Funcion para insertar productos harcodeados
// insertTestProducts();