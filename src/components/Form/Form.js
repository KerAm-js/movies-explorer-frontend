import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import './Form.css';

function Form({ inputs }) {
  return (
    <form className="form">
      <div className="form__inputs-container">
        {
          inputs.map(({ type, label, error, inputId }, index) => (
            <Input key={index} type={type} label={label} inputId={inputId} error={error} />
          ))
        }
      </div>
      <Button className="form__submit-btn" title="Зарегистрироваться" />
    </form>
  )
}

export default Form;