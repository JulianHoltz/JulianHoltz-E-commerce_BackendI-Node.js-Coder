import { Router } from "express"; //Importo modulo router de express
import { productModel } from "../models/product.model.js";


const router = Router();
//const __dirname = getDirname(import.meta.url); dirname quedo obsoleto 😭


//Obtener todos los productos con paginate
router.get("/", async (req, res) => {
  try {
    // Asignar default 10 a limit y 1 a page si no vienen en req.query
    const limit = req.query.limit ? parseInt(req.query.limit) : 9;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const { query, sort } = req.query;
    
    let filter = {};
    if (query) {
      filter.category = query; // Filtrar por categoría si se especifica
    }
    
    //Defino si el ordenamiento es ascendente o descendente
    let order = {};
    if (sort === "asc") {
      order.precio = 1; 
    } else if (sort === "desc") {
      order.precio = -1; 
    }
    
    //armo objeto de configuracion, paginado y orden, por ahora solo precio...
    const options = {
      limit,
      page,
      sort: sort === "asc" ? "price" : "-price",
    };
    

    const products = await productModel.paginate(filter, options);
    res.status(200).send({ status: "success", payload: products });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    res.status(500).send({ status: "error", message: "Could not retrieve products" });
  }
});


//obtener producto por id MONGODB
router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  if (!pid) {return res.status(400).json({ status:'error', message: "ID is required" });};
  try {
    const product = await productModel.findById(pid);
    if (!product) {return res.status(404).json({ status:'error', message: "product not found" });};
    res.status(200).json({ status:'success', message: "product found", payload: product});
  } catch (error) {
    res.status(500).json({ status:'error', message: "Error retriving the product" });
  }
});


//Agreagar una nuevo producto MONGODB
router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, img } = req.body;

  // Validamos que img tenga thumbnails y alt
  if (!title || !description || !code || !price || !stock || !category || !img || !img.thumbnails || !img.alt) {
    return res.status(400).json({
      error: "title, description, code, price, stock, category, img.thumbnails and img.alt are required"
    });
  }

  try {
    const newProduct = new productModel({
      title,
      description,
      code,
      price,
      stock,
      category,
      img
    });

    const savedProduct = await newProduct.save();
    res.status(201).send({ status: 'success', message: 'Product created successfully', payload: savedProduct });
  } catch (error) {
    console.error("Error saving the product:", error);
    res.status(500).send({ status: 'error', message: 'Error creating the product: ' + error.message });
  }
});


//Actualizar un producto MONGODB
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const { title, description, code, price, status, stock, category, img } =
    req.body;

  if (!pid) {return res.status(400).json({ status:'error', message: "ID is required" });}

  try {
    const product = await productModel.findById(pid);
    if(!product){return res.status(400).json({ status:'error', message: "product not found" });}

    //actualizamos al valor recibido, o dejamos el existente
    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.status = status || product.status;
    product.stock = stock || product.stock;
    product.category = category || product.category;

    //chequeo que el objeto img exista, para que no intente acceder a la nada...
    if(img){
      product.img.thumbnails = img.thumbnails || product.img.thumbnails;
      product.img.alt = img.alt || product.img.alt;
    }

    const updatedProduct = await product.save();

    return res.status(200).json({ status:'success', message: "product updated successfully", payload: updatedProduct});
  } catch (error) {
    res.status(500).json({ status:'error', message: "product can not be updated" });
  }
});

//Eliminar un producto MONGODB
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  if (!pid) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const result = await productModel.findByIdAndDelete(pid);
    if(!result){return res.status(404).send({status:'error', message:'Product not found.'})};
    res.status(204).send({status:'succes', message:'Product deleted succesfully.'});
  } catch (error) {
    console.error("Error, the product can not be deleted:", error);
    res.status(500).send({ status:'error', error: "Error, the product can not be deleted" });
  }
});


export default router;
