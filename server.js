// Import the necessary modules (REMEMBER TO INSTALL THE RIGHT DEPENDENCIES)
const express = require("express");
const path = require('path');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const Product = require("./models/productModel");

// Ignore favicon.ico request
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors()); // Enable CORS for all routes through middleware

// middleware in Express.js to parse URL-encoded form data.

// When a form is submitted with the method attribute set to "POST" and enctype attribute set to "application/x-www-form-urlencoded", the data is sent as key-value pairs in the body of the request. By using express.urlencoded() middleware, Express is able to parse this form data and make it available in the req.body object.

// The { extended: true } option allows for complex objects to be encoded in the URL-encoded format. If set to false, only simple key-value pairs can be encoded. By setting it to true, you enable the parsing of arrays, objects, and nested objects in the form data.

app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));


// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html')); // Serve the index.html file
});

// Serve the script.js file
app.get('/script.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, 'script.js'));
});
  

// Get all products (simple GET JSON request)
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Get a specific product by ID
app.get('/product/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);

        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({ success: false, message: 'Invalid product ID' });
        // }
        
        if (!product) {
            return res.status(404).json({message: `Cannot find a product with ID ${id}`});
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Create a new product (through POST API request, not form, so I comment)
// app.post('/product', async (req, res) => {
//     try {
//         const product = await Product.create(req.body);
//         res.status(200).json(product);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message});
//     }
// });


// Route to serve the update-product HTML page
app.get('/update-product.html', (req, res) => {
    res.sendFile(__dirname + '/update-product.html');
});

// Route to handle the product update form submission
app.post('/update-product-request', async (req, res) => {
    const { id, name, quantity, price, image } = req.body;
  
    try {
      // Find the product by ID
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Update the product fields
      if (name) {
        product.name = name;
      }

      if (quantity) {
        product.quantity = quantity;
      }

      if (price) {
        product.price = price;
      }

      if (image) {
        product.image = image;
      }
  
      // Save the updated product
      await product.save();
  
      res.redirect('/')
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Route to serve the product HTML form page
app.get('/product.html', (req, res) => {
    res.sendFile(__dirname + '/product.html');
});

// Route to handle the product creation form submission
app.post('/products', (req, res) => {
    const { name, quantity, price, image } = req.body;
  
    const product = new Product({
      name: name,
      quantity: quantity,
      price: price,
      image: image
    });
  
    product.save()
      .then(() => {
        res.redirect('/')
      })
      .catch((error) => {
        console.error('Product save error:', error);
        res.status(500).send('Failed to save the product');
      });
});

// Update a product by ID (through API PUT request, not form, so I comment)
// app.put('/product/:id', async(req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
        
//         if (!product) {
//             return res.status(404).json({message: `Cannot find a product with ID ${id}`});
//         } else {
//             const updatedProduct = await Product.findById(id);
//             res.status(200).json(updatedProduct);
//         }
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

// Delete a product by ID (through API DELETE request, not form, so I comment)
// app.delete('/product/:id', async(req, res) => {
//     try {
//         const {id} = req.params;
//         const product = await Product.findByIdAndDelete(id);
        
//         if (!product) {
//             return res.status(404).json({message: `Cannot find a product to delete with ID ${id}`});
//         } else {
//             res.status(200).json();
//         }
//     } catch (error) {
//         res.status(500).json({message: error.message});
//     }
// });

// Route to cancel a product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the product by ID
      const deletedProduct = await Product.findOneAndDelete({ _id: id });
  
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.json({ message: 'Product canceled successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

// Connect to the MongoDB database and start the server (Remember to insert your information)
mongoose.connect('mongodb+srv://###########:#############@############.grfe9mj.mongodb.net/node-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to the database');
        app.listen(3000, () => {
            console.log('Node API running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
