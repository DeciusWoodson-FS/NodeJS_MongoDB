import React from 'react';

function SearchFilters({
  searchTerm,
  onSearchChange,
  stores,
  selectedStore,
  onStoreChange,
  selectedCategory,
  onCategoryChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  onClearFilters
}) {
  return (
    <section className="section">
      <h2>Search & Filter Products</h2>
      
      <div className="form-group search-group">
        <label>Search by Product Name:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Enter product name to search..."
          className="search-input"
        />
      </div>

      <div className="filters">
        <div className="form-group">
          <label>Store:</label>
          <select
            value={selectedStore}
            onChange={(e) => onStoreChange(e.target.value)}
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
            onChange={(e) => onCategoryChange(e.target.value)}
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
            onChange={(e) => onMinPriceChange(e.target.value)}
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
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder="Max price"
          />
        </div>
        
        <button
          onClick={onClearFilters}
          className="btn btn-secondary"
        >
          Clear All
        </button>
      </div>
    </section>
  );
}

export default SearchFilters;

