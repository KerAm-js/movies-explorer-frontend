import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import './Form.css';

function Form({ inputs, submitTitle, isValid, error, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form__inputs-container">
        {
          inputs.map(({ ...props }) => (
            <Input key={props.inputId} {...props} />
          ))
        }
      </div>
      <div className="form__submit-container">
        <span className="form__error">{error}</span>
        <Button type="submit" className={`form__submit-btn ${isValid ? '' : 'form__submit-btn_disabled'}`} title={submitTitle} disabled={!isValid} />
      </div>
    </form>
  )
}

export default Form;