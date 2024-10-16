import mongoose from "mongoose"

export async function ConnectDB(){
    const conn = await mongoose.connect('mongodb://localhost:27017/PassVault');
}
