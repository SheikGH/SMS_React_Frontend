import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const CloseButton = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        padding: '0',
      }}
      aria-label="Close"
    >
      <FontAwesomeIcon icon={faTimes} size="lg" />
    </button>
  );
};

export default CloseButton;
