import React from 'react';

function ProductCard({ product, storeName }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
      <p className="product-category">
        <span className={`category-badge category-${product.category.toLowerCase()}`}>
          {product.category}
        </span>
      </p>
      {product.storeId && (
        <p className="product-store">
          {storeName}
        </p>
      )}
    </div>
  );
}

export default ProductCard;

