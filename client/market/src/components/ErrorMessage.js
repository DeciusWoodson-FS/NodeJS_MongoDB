import React from 'react';

const styles = {
  container: {
    backgroundColor: '#2a1a1a',
    color: '#ff6b6b',
    padding: '15px 20px',
    borderRadius: '6px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #4a2a2a',
  },
  button: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    fontSize: '24px',
    cursor: 'pointer',
    padding: 0,
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },
};

function ErrorMessage({ error, onClose }) {
  if (!error) return null;

  return (
    <div style={styles.container}>
      {error}
      <button onClick={onClose} style={styles.button}>×</button>
    </div>
  );
}

export default ErrorMessage;
