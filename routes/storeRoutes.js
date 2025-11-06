const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// GET /api/stores
router.get('/', storeController.getAllStores);

// POST /api/stores
router.post('/', storeController.createStore);

// GET /api/stores/:id
router.get('/:id', storeController.getStoreById);

// PUT /api/stores/:id
router.put('/:id', storeController.updateStore);

// DELETE /api/stores/:id
router.delete('/:id', storeController.deleteStore);

module.exports = router;