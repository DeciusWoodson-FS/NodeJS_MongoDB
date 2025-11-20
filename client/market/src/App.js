import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ErrorMessage from './components/ErrorMessage';
import SearchFilters from './components/SearchFilters';
import StoresList from './components/StoresList';
import ProductsList from './components/ProductsList';

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

  // Filter products by search 
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

  // Fetch products when filters change
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
      <Header />

      <div className="container">
        <ErrorMessage error={error} onClose={() => setError(null)} />

        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          stores={stores}
          selectedStore={selectedStore}
          onStoreChange={setSelectedStore}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          minPrice={minPrice}
          onMinPriceChange={setMinPrice}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          onClearFilters={clearFilters}
        />

        <StoresList
          stores={stores}
          loading={loading}
          selectedStore={selectedStore}
          onStoreSelect={setSelectedStore}
          onRefresh={fetchStores}
        />

        <ProductsList
          products={products}
          filteredProducts={filteredProducts}
          loading={loading}
          searchTerm={searchTerm}
          selectedStore={selectedStore}
          selectedCategory={selectedCategory}
          minPrice={minPrice}
          maxPrice={maxPrice}
          stores={stores}
          onRefresh={fetchProducts}
          getStoreName={getStoreName}
        />
      </div>
    </div>
  );
}

export default App;
