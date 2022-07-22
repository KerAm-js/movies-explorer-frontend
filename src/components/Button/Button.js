import React from 'react';
import './Button.css';

function Button({ title, className, children, ...props }) {
  return (
    <button className={`button ${className}`} {...props}>
      {
        children 
          ? children
          : title
      }
    </button>
  )
}

export default Button