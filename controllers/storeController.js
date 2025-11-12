const Store = require('../models/store');
const Product = require('../models/product'); 

// POST /api/stores (Create a new store)
exports.createStore = async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store); // 201 Created
  } catch (err) {
    res.status(400).json({ message: 'Error creating store', error: err.message });
  }
};

// GET /api/stores (Get all stores)
exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.find()
      .populate({
        path: 'products',
        select: 'name price category storeId createdAt updatedAt'
      });
    res.status(200).json(stores); // 200 OK
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores', error: err.message });
  }
};

// GET /api/stores/:id (Get a single store by ID)
exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id)
      .populate({
        path: 'products',
        select: 'name price category storeId createdAt updatedAt'
      });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' }); // 404 Not Found
    }
    res.status(200).json(store); // 200 OK
  } catch (err) {
    res.status(500).json({ message: 'Error fetching store', error: err.message });
  }
};

// PUT /api/stores/:id (Update a store by ID)
exports.updateStore = async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }
    res.status(200).json(store);
  } catch (err) {
    res.status(400).json({ message: 'Error updating store', error: err.message });
  }
};

// DELETE /api/stores/:id (Delete a store by ID)
exports.deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Before deleting the store, delete all products associated with it.
    await Product.deleteMany({ storeId: req.params.id });

    // Now, delete the store itself
    await store.deleteOne(); 

    res.status(200).json({ message: 'Store and all associated products deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting store', error: err.message });
  }
};