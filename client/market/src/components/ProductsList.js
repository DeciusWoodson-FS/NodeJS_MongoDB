import React from 'react';
import ProductCard from './ProductCard';

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
        <button onClick={onRefresh} className="btn btn-secondary" disabled={loading}>
          Refresh
        </button>
      </div>
      {loading && products.length === 0 ? (
        <div className="loading">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          {hasActiveFilters
            ? 'No products match your search criteria. Try adjusting your filters.'
            : 'No products found in the database.'}
        </div>
      ) : (
        <div className="products-grid">
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

