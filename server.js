const express = require('express');
const mongoose = require('mongoose');

const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/inventory');

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
