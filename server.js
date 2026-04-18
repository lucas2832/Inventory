import "dotenv/config";
import express, { json } from 'express';
import productRoutes from "./src/routes/productRoutes.js";

import connectDB from "./src/config/dbConnect.js";

const PORT = 3000;

const app = express();
app.use(json());

connectDB();

app.use("/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
