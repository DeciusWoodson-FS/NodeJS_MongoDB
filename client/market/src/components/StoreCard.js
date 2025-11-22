import React from 'react';

const styles = {
  card: {
    backgroundColor: '#121212',
    borderRadius: '8px',
    padding: '20px',
    border: '1px solid #333',
    cursor: 'pointer',
  },
  cardSelected: {
    backgroundColor: '#1a1a1a',
    border: '2px solid #555',
  },
  h3: {
    margin: '0 0 10px 0',
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  location: {
    color: '#999',
    margin: '8px 0',
    fontSize: '0.9rem',
  },
  status: {
    margin: '10px 0',
  },
  statusOpen: {
    color: '#4ade80',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  statusClosed: {
    color: '#f87171',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  productCount: {
    color: '#888',
    fontWeight: 500,
    marginTop: '10px',
    fontSize: '0.85rem',
  },
};

function StoreCard({ store, isSelected, onSelect }) {
  return (
    <div 
      style={isSelected ? { ...styles.card, ...styles.cardSelected } : styles.card}
      onClick={onSelect}
    >
      <h3 style={styles.h3}>{store.name}</h3>
      <p style={styles.location}>{store.location}</p>
      <p style={styles.status}>
        {store.isOpen ? (
          <span style={styles.statusOpen}>Open</span>
        ) : (
          <span style={styles.statusClosed}>Closed</span>
        )}
      </p>
      {store.products && store.products.length > 0 && (
        <p style={styles.productCount}>{store.products.length} product(s)</p>
      )}
    </div>
  );
}

export default StoreCard;

