import React from 'react';

function StoreCard({ store, isSelected, onSelect }) {
  return (
    <div 
      className={`store-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
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
  );
}

export default StoreCard;

