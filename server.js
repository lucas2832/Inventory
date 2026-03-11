import express, { json } from 'express';
import mongoose from 'mongoose';

import productRoutes from "./routes/productRoutes.js";

const PORT = 3000;

const app = express();
app.use(json());

mongoose.connect('mongodb://localhost:27017/inventory');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connected');
});

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
