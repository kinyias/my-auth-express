import mongoose from "mongoose";
import { config } from "../config/app.config";
const connectDatabase = async ()=>{
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to mongoDB")
    } catch (error) {
        console.log("Error connecting database",error);
        process.exit(1);
    }
}
export default connectDatabase