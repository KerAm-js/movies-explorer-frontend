import React from "react";
import './Input.css';

function Input({ type, label, error, inputId }) {
  return (
    <div className="input">
      <label className="input__label" htmlFor={inputId}>{label}</label>
      <input className={`input__element ${error && 'input__element_invalid'}`} id={inputId} type={type}/>
      {
        error && <span className="input__error">{error}</span>
      }
    </div>
  )
}

export default Input;