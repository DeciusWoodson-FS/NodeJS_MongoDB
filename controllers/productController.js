const Product = require('../models/product');
const Store = require('../models/store'); // Import Store to check if it exists

// POST /api/products (Create a new product)
exports.createProduct = async (req, res) => {
  try {
    // Check if the storeId provided in the request body actually exists
    const storeExists = await Store.findById(req.body.storeId);
    if (!storeExists) {
      return res.status(404).json({ message: 'Store not found. Cannot create product.' });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error creating product', error: err.message });
  }
};

// GET (Get all products)
exports.getAllProducts = async (req, res) => {
  try {
    let filter = {};
    
    // Filter by storeId
    if (req.query.storeId) {
      filter.storeId = req.query.storeId;
    }
    
    // Filter by category (Grocery, Electronics, etc..)
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    // Filter by price range 
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseFloat(req.query.maxPrice);
      }
    }
    
    const products = await Product.find(filter).populate('storeId');
    
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

// GET (Get a single product by ID)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('storeId');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

// PUT (Update a product by ID)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product', error: err.message });
  }
};

// DELETE (Delete a product by ID)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};