import React from 'react';

function ErrorMessage({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="error-message">
      {error}
      <button onClick={onClose}>×</button>
    </div>
  );
}

export default ErrorMessage;