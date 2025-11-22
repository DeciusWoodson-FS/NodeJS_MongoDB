import React from 'react';

const styles = {
  card: {
    backgroundColor: '#121212',
    borderRadius: '8px',
    padding: '20px',
    border: '1px solid #333',
  },
  h3: {
    margin: '0 0 10px 0',
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  price: {
    fontSize: '1.4rem',
    fontWeight: 600,
    color: '#ffffff',
    margin: '10px 0',
  },
  category: {
    margin: '10px 0',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  badgeElectronics: {
    backgroundColor: '#1a1a2a',
    color: '#60a5fa',
    border: '1px solid #2a2a3a',
  },
  badgeApparel: {
    backgroundColor: '#2a1a1a',
    color: '#f472b6',
    border: '1px solid #3a2a2a',
  },
  badgeGrocery: {
    backgroundColor: '#1a2a1a',
    color: '#4ade80',
    border: '1px solid #2a3a2a',
  },
  badgeOther: {
    backgroundColor: '#2a1a2a',
    color: '#a78bfa',
    border: '1px solid #3a2a3a',
  },
  store: {
    color: '#888',
    fontSize: '0.85rem',
    marginTop: '10px',
  },
};

function ProductCard({ product, storeName }) {
  const categoryKey = `badge${product.category}`;
  const badgeStyle = styles[categoryKey] || styles.badgeOther;

  return (
    <div style={styles.card}>
      <h3 style={styles.h3}>{product.name}</h3>
      <p style={styles.price}>${parseFloat(product.price).toFixed(2)}</p>
      <p style={styles.category}>
        <span style={{ ...styles.badge, ...badgeStyle }}>
          {product.category}
        </span>
      </p>
      {product.storeId && (
        <p style={styles.store}>
          {storeName}
        </p>
      )}
    </div>
  );
}

export default ProductCard;

