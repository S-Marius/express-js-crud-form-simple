// Before working with this file, remember to create the MongoDB database and the appropiate collection/cluster

// Import the Mongoose library
const mongoose = require('mongoose');

// Define the product schema using the Mongoose.Schema function
const productSchema = mongoose.Schema(
  {
    // Define the name field of type String
    name: {
      type: String,
      required: [true, "Please enter a product name"] // Specifies that this field is required and provides an error message if not provided
    },
    // Define the quantity field of type Number
    quantity: {
      type: Number,
      required: true, // Specifies that this field is required
      default: 0, // Specifies a default value of 0 if not provided
    },
    // Define the price field of type Number
    price: {
      type: Number,
      required: true, // Specifies that this field is required
    },
    // Define the image field of type String
    image: {
      type: String,
      required: false, // Specifies that this field is not required
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields to the schema, automatically managed by Mongoose
  }
);

// Create a Mongoose model for the product schema, named "Product"
const Product = mongoose.model("Product", productSchema);

// Export the Product model to make it available for other files
module.exports = Product;
