import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema(
  {
    user:{
        type: String,
        required:true
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

// Middleware para cargar los detalles de los productos automáticamente
cartSchema.pre(/^find/, function (next) {
  this.populate("products.product");
  next();
});

export const cartModel = mongoose.model(cartCollection, cartSchema);



