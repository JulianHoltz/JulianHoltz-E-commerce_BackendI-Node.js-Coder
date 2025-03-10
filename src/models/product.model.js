import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
        
    },
    code:{
        type: String,
        required:true,
        unique:true
    },
    price:{
        type: Number,
        required:true
    },
    status:{
        type: String,
        required:true,
        default:true
    },
    stock:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        set: value => value.toLowerCase(),
        enum:['rebars','beams','steelshets','powertools'],
        required:true
    },
    img:{
        thumbnails:{type: String,required:true,},
        alt:{type: String,required:true,}
    }
});

productSchema.plugin(mongoosePaginate);
export const productModel = mongoose.model(productCollection, productSchema);