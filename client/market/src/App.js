import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:3000/api';

function App() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Search and filter states
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch stores
  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/stores`);
      const data = await response.json();
      if (data.success) {
        setStores(data.data);
      }
    } catch (err) {
      setError('Failed to fetch stores: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products with filters
  const fetchProducts = async () => {
    try {
      setLoading(true);
      let url = `${API_BASE_URL}/products?`;
      const params = new URLSearchParams();
      
      if (selectedStore) params.append('storeId', selectedStore);
      if (selectedCategory) params.append('category', selectedCategory);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      
      url += params.toString();
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      setError('Failed to fetch products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter products by search term (client-side)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  // Load data on component mount
  useEffect(() => {
    fetchStores();
    fetchProducts();
  }, []);

  // Refetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedStore, selectedCategory, minPrice, maxPrice]);

  // Clear all filters
  const clearFilters = () => {
    setSelectedStore('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
  };

  // Get store name by ID
  const getStoreName = (storeId) => {
    if (!storeId) return 'Unknown';
    if (typeof storeId === 'object') return storeId.name;
    const store = stores.find(s => s._id === storeId);
    return store ? store.name : 'Unknown';
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Store Product Search</h1>
        <p>Search and browse products from your favorite stores</p>
      </header>

      <div className="container">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Search and Filter Section */}
        <section className="section">
          <h2>Search & Filter Products</h2>
          
          {/* Product Name Search */}
          <div className="form-group search-group">
            <label>Search by Product Name:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter product name to search..."
              className="search-input"
            />
          </div>

          {/* Filters */}
          <div className="filters">
            <div className="form-group">
              <label>Store:</label>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
              >
                <option value="">All Stores</option>
                {stores.map(store => (
                  <option key={store._id} value={store._id}>
                    {store.name} - {store.location}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Apparel">Apparel</option>
                <option value="Grocery">Grocery</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Min Price:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min price"
              />
            </div>
            
            <div className="form-group">
              <label>Max Price:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max price"
              />
            </div>
            
            <button
              onClick={clearFilters}
              className="btn btn-secondary"
            >
              Clear All
            </button>
          </div>
        </section>

        {/* Stores Overview */}
        <section className="section">
          <div className="section-header">
            <h2>Available Stores ({stores.length})</h2>
            <button onClick={fetchStores} className="btn btn-secondary" disabled={loading}>
              Refresh
            </button>
          </div>
          {loading && stores.length === 0 ? (
            <div className="loading">Loading stores...</div>
          ) : stores.length === 0 ? (
            <div className="empty-state">No stores found in the database.</div>
          ) : (
            <div className="stores-grid">
              {stores.map(store => (
                <div 
                  key={store._id} 
                  className={`store-card ${selectedStore === store._id ? 'selected' : ''}`}
                  onClick={() => setSelectedStore(selectedStore === store._id ? '' : store._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{store.name}</h3>
                  <p className="store-location">{store.location}</p>
                  <p className="store-status">
                    {store.isOpen ? (
                      <span className="status-open">Open</span>
                    ) : (
                      <span className="status-closed">Closed</span>
                    )}
                  </p>
                  {store.products && store.products.length > 0 && (
                    <p className="product-count">{store.products.length} product(s)</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Products List */}
        <section className="section">
          <div className="section-header">
            <h2>
              Products 
              {filteredProducts.length !== products.length && (
                <span className="results-count">
                  {' '}(Showing {filteredProducts.length} of {products.length})
                </span>
              )}
              {filteredProducts.length === products.length && products.length > 0 && (
                <span className="results-count"> ({products.length})</span>
              )}
            </h2>
            <button onClick={fetchProducts} className="btn btn-secondary" disabled={loading}>
              Refresh
            </button>
          </div>
          {loading && products.length === 0 ? (
            <div className="loading">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              {searchTerm || selectedStore || selectedCategory || minPrice || maxPrice
                ? 'No products match your search criteria. Try adjusting your filters.'
                : 'No products found in the database.'}
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product._id} className="product-card">
                  <h3>{product.name}</h3>
                  <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
                  <p className="product-category">
                    <span className={`category-badge category-${product.category.toLowerCase()}`}>
                      {product.category}
                    </span>
                  </p>
                  {product.storeId && (
                    <p className="product-store">
                      {getStoreName(product.storeId)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
