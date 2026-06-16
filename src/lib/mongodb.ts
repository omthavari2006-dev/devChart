import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB(){
    if (!MONGODB_URI) {
        throw new Error('MONGODB_URI is not defined');
    }

    if (mongoose.connection.readyState >= 1) {
    return;
}

try {
    await mongoose.connect(MONGODB_URI, {
        tlsAllowInvalidCertificates: true
    });
    console.log("MongoDB connected successfully");
} catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
}
}

export default connectDB;