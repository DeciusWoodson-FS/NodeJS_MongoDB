import React from 'react';

const styles = {
  header: {
    textAlign: 'center',
    color: '#e0e0e0',
    marginBottom: '40px',
    padding: '30px 20px',
    borderBottom: '1px solid #333',
  },
  h1: {
    margin: '0 0 10px 0',
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  p: {
    margin: 0,
    fontSize: '1rem',
    color: '#999',
  },
};

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.h1}>Store Product Search</h1>
      <p style={styles.p}>Search and browse products from your favorite stores</p>
    </header>
  );
}

export default Header;