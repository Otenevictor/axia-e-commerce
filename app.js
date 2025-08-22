const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file


const mongoose = require('mongoose');

// Importing the user routes
const userRoutes = require('./routes/user.route');
const orderRoutes = require('./routes/order.route');
const cartRoutes = require('./routes/cart.route');  
const productRoutes = require('./routes/product.route'); // Assuming you have a product route


// Create connection to the database
mongoose.connect(process.env.MONGO_URL,) // Modified line
  .then(() => {
    // This block will execute if the connection is successful
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    // This block will execute if there's an error connecting to the database
    console.error('Database connection error:', err);
    // You might want to exit the process or take other actions here
    // process.exit(1); // Uncomment this line if you want the app to exit on DB connection failure
  });

// Middleware to parse JSON bodies
app.use(express.json());

const port = process.env.PORT || 1000; // Use PORT from environment variables or default to 6000

app.use(cookieParser());

// Connecting endpoints for user database manipulation
app.use(userRoutes);
app.use(orderRoutes);
app.use(cartRoutes);
app.use(productRoutes); // Assuming you have a product route


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
