import express from 'express'; //importo la libreria de express
import productsRouter from './routes/products.routes.js'
import chartsRouter from './routes/charts.routes.js'
import morgan from 'morgan';
import { getDirname } from "./utils/dirname.js";
import { Server } from "socket.io";
import handlebars from 'express-handlebars';
import realtimeRoutes from './routes/realtime.routes.js'
import { loadProducts } from "./routes/products.routes.js";




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
app.use("/api/charts", chartsRouter);


//paginas publicas
app.use("/",express.static(__dirname + "/public"));//direccion a la carpeta static
app.use("/products/realtimeProducts", realtimeRoutes); //linkeo ROUTES


//listener del puerto
const httpServer = app.listen(PORT, () => {
    console.log(`${colores.info}Servidor escuchando en el puerto: ${PORT}`);
});

//wraper de websocket
const io = new Server(httpServer);


// WebSocket para enviar la lista de productos
io.on("connection", async (socket) => {
    console.log("Cliente conectado");

    // Enviar la lista inicial de productos
    let products = await loadProducts();
    socket.emit("productList", products);

    // Emitir la lista de productos al conectar un cliente
    socket.on("newProductAdded", async () => {
    const updatedProducts = await loadProducts();
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