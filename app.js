require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Routes
const productsRouter = require('./routes/products');

// Connect Database
const connectDB = require('./db/connect');

// async error
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const req = require('express/lib/request');

// middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1> <a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productsRouter);

// Product Route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening at ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
