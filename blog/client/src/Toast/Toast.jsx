import React from 'react';
import './Toast.css';
import { useState } from 'react';

export default ({ show, title, message, customClose }) => {
  const closeToast = () => {
    customClose();
  };
  if (!show) return <div></div>;
  return (
    <div>
      <div className='alert'>
        <div className='alert-header'>
          <h4>{title}</h4>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='toast'
            aria-label='Close'
            onClick={closeToast}></button>
        </div>
        <hr />
        <div className='alert-content'>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};
