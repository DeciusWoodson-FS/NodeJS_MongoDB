import React from 'react';
import ProductCard from './ProductCard';

const styles = {
  section: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '25px',
    marginBottom: '25px',
    border: '1px solid #333',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  h2: {
    margin: 0,
    color: '#ffffff',
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  resultsCount: {
    fontSize: '0.9rem',
    fontWeight: 'normal',
    color: '#888',
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
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#888',
    fontSize: '1rem',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '1rem',
  },
};

function ProductsList({ 
  products, 
  filteredProducts, 
  loading, 
  searchTerm,
  selectedStore,
  selectedCategory,
  minPrice,
  maxPrice,
  stores,
  onRefresh,
  getStoreName
}) {
  const hasActiveFilters = searchTerm || selectedStore || selectedCategory || minPrice || maxPrice;

  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.h2}>
          Products 
          {filteredProducts.length !== products.length && (
            <span style={styles.resultsCount}>
              {' '}(Showing {filteredProducts.length} of {products.length})
            </span>
          )}
          {filteredProducts.length === products.length && products.length > 0 && (
            <span style={styles.resultsCount}> ({products.length})</span>
          )}
        </h2>
        <button 
          onClick={onRefresh} 
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button} 
          disabled={loading}
        >
          Refresh
        </button>
      </div>
      {loading && products.length === 0 ? (
        <div style={styles.loading}>Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={styles.emptyState}>
          {hasActiveFilters
            ? 'No products match your search criteria. Try adjusting your filters.'
            : 'No products found in the database.'}
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              storeName={getStoreName(product.storeId)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductsList;

