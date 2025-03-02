import express from 'express';
import axios from 'axios';

const router = express.Router();

//endpoints
router.get('/', (req,res) => {
    res.render("index", {

    });
});


//ENDPOINT product detail
router.get('/productDetail/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        // Hacemos una petición a la API interna de productos
        const response = await axios.get(`http://localhost:8080/api/products/${pid}`);
        const product = response.data.payload; // Obtenemos el producto de la respuesta

        if (!product) {
            return res.status(404).render("errorPage", { message: "Producto no encontrado" });
        }

        res.render("productDetail", { product });
    } catch (error) {
        console.error("Error al obtener el producto desde la API:", error.message);
        res.status(500).render("errorPage", { message: "Error al cargar el producto" });
    }
});


//ENDPOINT Cart Detail
router.get('/cart/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        // Hacemos una petición a la API interna de carts
        const response = await axios.get(`http://localhost:8080/api/carts/${cid}`);
        const cart = response.data.payload; // Obtenemos el carrito de la respuesta

        if (!cart) {
            return res.status(404).render("errorPage", { message: "Carrito no encontrado" });
        }

        res.render("cart", { cart });
    } catch (error) {
        console.error("Error al obtener el carrito desde la API:", error.message);
        res.status(500).render("errorPage", { message: "Error al cargar el carrito" });
    }
});



  

export default router;