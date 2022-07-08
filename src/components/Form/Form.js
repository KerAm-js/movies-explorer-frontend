import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import './Form.css';

function Form({ inputs, submitTitle }) {
  return (
    <form className="form">
      <div className="form__inputs-container">
        {
          inputs.map(({ type, label, error, inputId, required }, index) => (
            <Input required={required} key={index} type={type} label={label} inputId={inputId} error={error} />
          ))
        }
      </div>
      <Button type="submit"  className="form__submit-btn" title={submitTitle} />
    </form>
  )
}

export default Form;