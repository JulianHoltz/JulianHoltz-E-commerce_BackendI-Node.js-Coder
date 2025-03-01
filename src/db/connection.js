import mongoose from "mongoose";

//mongodb+srv://julianholzs:<db_password>@cluster0.ab0mn.mongodb.net/

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://julianholzs:Mithrandir%233@cluster0.ab0mn.mongodb.net/', {
            dbName: 'miBaseDeDatos'
        });
        console.log("\x1b[34m✅ Vamos joya, Conectado a MongoDB\x1b[0m");
    } catch (error) {
        console.error("\x1b[31m❌ Se pudrio todo, no anda DB:\x1b[0m", error);
        process.exit(1);
    }
};

export default mongoose;
