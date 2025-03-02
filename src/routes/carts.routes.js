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

//Agregar producto al carrito (MONGODB ok)
router.post("/:cid/:pid/:quantity", async (req, res) => {
  const { cid, pid, quantity } = req.params;

  try {
    const cart = await cartModel.findById(cid).populate('products.product');  // Aseguramos que los productos sean poblados

    if (!cart) {
      return res.status(400).json({ status: 'error', message: "Cart not found" });
    }

    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.products.find(p => p.product._id.toString() === pid);

    // Si el producto ya existe, sumar la cantidad, sino, agregarlo
    if (existingProduct) {

      existingProduct.quantity += parseInt(quantity, 10);
    } else {
      
      cart.products.push({ product: pid, quantity: parseInt(quantity, 10) });
    }

    await cart.save();

    res.status(200).json({ status: 'success', message: 'Product added to cart', cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//eliminar producto (MONGO ok)
router.delete("/:cid/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    // Buscar el carrito en la base de datos
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    // Filtrar los productos para eliminar el que coincide con el `pid`
    cart.products = cart.products.filter(p => p.product._id.toString() !== pid);

    // Guardar el carrito actualizado
    await cart.save();

    res.status(200).json({ status: "success", message: "Product removed", cart });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//Vaciar Carrito
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cart = await cartModel.findById(cid);
    res.status(200).send({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).send({ status: 'error', message: 'Error retriving the cart: ' + error.message });
  }
});

//Agregar producto al carrito (MONGODB ok)
router.post("/:cid/:pid/:quantity", async (req, res) => {
  const { cid, pid, quantity } = req.params;

  try {
    const cart = await cartModel.findById(cid).populate('products.product');  // Aseguramos que los productos sean poblados

    if (!cart) {
      return res.status(400).json({ status: 'error', message: "Cart not found" });
    }

    // Verificar si el producto ya existe en el carrito
    const existingProduct = cart.products.find(p => p.product._id.toString() === pid);

    // Si el producto ya existe, sumar la cantidad, sino, agregarlo
    if (existingProduct) {

      existingProduct.quantity += parseInt(quantity, 10);
    } else {
      
      cart.products.push({ product: pid, quantity: parseInt(quantity, 10) });
    }

    await cart.save();

    res.status(200).json({ status: 'success', message: 'Product added to cart', cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Vaciar carrito (MONGO ok)
router.delete("/:cid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    // Buscar el carrito en la base de datos
    const cart = await cartModel.findById(cid);
    if (!cart) return res.status(404).json({ status: "error", message: "Cart not found" });

    cart.products = [];

    // Guardar el carrito actualizado
    await cart.save();

    res.status(200).json({ status: "success", message: "Products removed", cart });
  } catch (error) {
    console.error("Error removing products:", error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});



export default router;