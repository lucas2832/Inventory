import mongoose from "mongoose";

async function connectDB() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB connected');
    return mongoose.connection;
};

export default connectDB;