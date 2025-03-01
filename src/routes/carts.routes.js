import { Router } from "express";
import { getDirname } from "../utils/dirname.js";
import { cartModel } from "../models/cart.model.js";


const router = Router();
const __dirname = getDirname(import.meta.url);

//Obtener todos los carritos (MongoDB ok)
router.get("/", async (req, res) => {
 try {
    const carts = await cartModel.find();
    res.status(200).send({ status: "success", payload: carts });
  } catch (error) {
    console.error("Error loading carts:", error);
    res.status(500).send({ status: "error", message: "Could not retrieve carts" });
  }
});

//Crear Carrito Nuevo (MongoDB ok)
router.post("/:user", async (req,res) => {
  const {user} = req.params;
  try{
      const newCart = new cartModel({user});
      const cart = await newCart.save();
      res.status(201).send({ status: 'success', message: 'Cart created successfully', payload: cart });
  }
  catch(error) {
    console.error("Error creating the cart:", error);
    res.status(500).send({ status: 'error', message: 'Error creating the cart: ' + error.message });
  }
});

//obtener carrito por id (MongoDB ok)
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    res.status(200).send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Error retriving the cart: ' + error.message });
  }
});

//Agregar producto al carrito TERMINAR
router.post("/:cid/:pid/:quantity", async (req,res) => {
  const {cid,pid, quantity} = req.params;
  try {
    
  } catch (error) {

    res.status(500).json({ error: "Error interno del servidor" });
  }

});



export default router;