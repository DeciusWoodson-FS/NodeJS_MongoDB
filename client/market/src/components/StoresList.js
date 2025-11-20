import React from 'react';
import StoreCard from './StoreCard';

function StoresList({ stores, loading, selectedStore, onStoreSelect, onRefresh }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>Available Stores ({stores.length})</h2>
        <button onClick={onRefresh} className="btn btn-secondary" disabled={loading}>
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
            <StoreCard
              key={store._id}
              store={store}
              isSelected={selectedStore === store._id}
              onSelect={() => onStoreSelect(selectedStore === store._id ? '' : store._id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default StoresList;

