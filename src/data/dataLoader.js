import { productModel } from "../models/product.model.js";

const products = [
  {
    title: "Rebar 8mm",
    description: "Steel reabar 8mm width, for concrete reinforcement",
    code: "0000000002",
    price: 18,
    stock: 10,
    category: "rebars",
    img: {
      thumbnails: "https://i.ibb.co/d42TkbYs/varillas8.jpg",
      alt: "Rebar photo",
    },
  },
  {
    title: "Rebar 10mm",
    description: "Steel reabar 10mm width, for concrete reinforcement",
    code: "0000000003",
    price: 21,
    stock: 10,
    category: "rebars",
    img: {
      thumbnails: "https://i.ibb.co/v4d6grdW/varillas10.jpg",
      alt: "Rebar photo",
    },
  },
  {
    title: "Rebar 12mm",
    description: "Steel reabar 12mm width, for concrete reinforcement",
    code: "0000000004",
    price: 28,
    stock: 10,
    category: "rebars",
    img: {
      thumbnails: "https://i.ibb.co/R4jqtz5Y/varillas12.jpg",
      alt: "Rebar photo",
    },
  },
  {
    title: "Structural Angle 2x2x1/4",
    description: `Steel Beam hot rolled Angle 2" by 2", width 1/4 total length 6m`,
    code: "0000000005",
    price: 45,
    stock: 100,
    category: "beams",
    img: {
      thumbnails: "https://i.ibb.co/0R5kw7tp/Angulo-2x2x1-4.jpg",
      alt: "Hot rolled angle photo",
    },
  },
  {
    title: "HEB 200",
    description: "Steel Beam hot rolled HEB 200mm by 200mm, total length 12m",
    code: "0000000006",
    price: 185,
    stock: 10,
    category: "beams",
    img: {
      thumbnails: "https://i.ibb.co/1YR5b8Y7/HEB200.jpg",
      alt: "Hot rolled HEB Beam photo",
    },
  },
  {
    title: "Structural Tube 20x20x2",
    description: "Steel Beam hot rolled tube 20mm by 20mm e=2mm, total length 6m",
    code: "0000000007",
    price: 120,
    stock: 50,
    category: "beams",
    img: {
      thumbnails: "https://i.ibb.co/p6QQFmDt/tube2x2-jpeg.jpg",
      alt: "Hot rolled tube photo",
    },
  },
  {
    title: "Corrugated steel sheet",
    description: "Corrugated steel sheet C27 6m",
    code: "0000000008",
    price: 98,
    stock: 200,
    category: "steelshets",
    img: {
      thumbnails: "https://i.ibb.co/5WwMsfhZ/corrugated-Sheet.jpg",
      alt: "Rufing Steel Sheet",
    },
  },
  {
    title: "steel sheet 1/2",
    description: "steel sheet 5 x 8",
    code: "0000000009",
    price: 908,
    stock: 80,
    category: "steelshets",
    img: {
      thumbnails: "https://i.ibb.co/xqRf3B7H/Steel-Sheet.jpg",
      alt: "Steel Sheet 1/2(in)",
    },
  },
  {
    title: "Bosch Power Screwdriver",
    description: "Bosch - GSR 18V Batery Screwdriver, Batery is not included",
    code: "0000000010",
    price: 520,
    stock: 10,
    category: "PowerTools",
    img: {
      thumbnails: "https://i.ibb.co/mV02Cn8b/bosch-gsb.jpg",
      alt: "Electrical screwdriver tool",
    },
  },
  {
    title: "Bosch Grinder",
    description: "Bosch - GWS 850w Grinder",
    code: "0000000011",
    price: 240,
    stock: 6,
    category: "PowerTools",
    img: {
      thumbnails: "https://i.ibb.co/1fRt5Qd4/amoladora.jpg",
      alt: "Electrical Grinder tool",
    },
  }
];

export const insertTestProducts = async () => {
    try{
        const result =await productModel.insertMany(products);
    } catch (error){
        console.log("Failure attempting to insert products list",error);
    } finally {
        process.exit();
    }
}