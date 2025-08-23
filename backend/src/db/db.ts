import mongoose from 'mongoose';
import { MONGO_URI } from '../config/config.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.error("MongoDB connection failed: ", error);
        process.exit(1);   
    }
};