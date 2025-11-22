import React from 'react';
import StoreCard from './StoreCard';

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

function StoresList({ stores, loading, selectedStore, onStoreSelect, onRefresh }) {
  return (
    <section style={styles.section}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.h2}>Available Stores ({stores.length})</h2>
        <button 
          onClick={onRefresh} 
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button} 
          disabled={loading}
        >
          Refresh
        </button>
      </div>
      {loading && stores.length === 0 ? (
        <div style={styles.loading}>Loading stores...</div>
      ) : stores.length === 0 ? (
        <div style={styles.emptyState}>No stores found in the database.</div>
      ) : (
        <div style={styles.grid}>
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

