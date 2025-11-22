import React from 'react';

const styles = {
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '25px',
    marginBottom: '25px',
    border: '1px solid #333',
  },
  h2: {
    margin: '0 0 20px 0',
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 500,
    borderBottom: '1px solid #333',
    paddingBottom: '12px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontWeight: 500,
    color: '#ccc',
    fontSize: '0.9rem',
  },
  input: {
    padding: '12px',
    backgroundColor: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#e0e0e0',
  },
  select: {
    padding: '12px',
    backgroundColor: '#0a0a0a',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#e0e0e0',
  },
  searchGroup: {
    marginBottom: '25px',
  },
  filters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'end',
  },
  button: {
    padding: '12px 24px',
    border: '1px solid #333',
    borderRadius: '6px',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    backgroundColor: '#1a1a1a',
    color: '#ccc',
  },
};

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
    <section style={styles.section}>
      <h2 style={styles.h2}>Search & Filter Products</h2>
      
      <div style={{ ...styles.formGroup, ...styles.searchGroup }}>
        <label style={styles.label}>Search by Product Name:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Enter product name to search..."
          style={styles.input}
        />
      </div>

      <div style={styles.filters}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Store:</label>
          <select
            value={selectedStore}
            onChange={(e) => onStoreChange(e.target.value)}
            style={styles.select}
          >
            <option value="">All Stores</option>
            {stores.map(store => (
              <option key={store._id} value={store._id}>
                {store.name} - {store.location}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={styles.select}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Apparel">Apparel</option>
            <option value="Grocery">Grocery</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Min Price:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder="Min price"
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Max Price:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder="Max price"
            style={styles.input}
          />
        </div>
        
        <button
          onClick={onClearFilters}
          style={styles.button}
        >
          Clear All
        </button>
      </div>
    </section>
  );
}

export default SearchFilters;

