import React from "react";
import Button from "../Button/Button";
import './Checkbox.css';

function Checkbox({ title, isChecked, setChecked }) {
  return (
    <div className="checkbox">
      <p className="checkbox__title">{title}</p>
      <Button type="button" className={`checkbox__element ${isChecked && 'checkbox__element_checked'}`} onClick={setChecked}>
        <div className={`checkbox__circle ${isChecked && 'checkbox__circle_checked'}`} />
      </Button>
    </div>
  )
}

export default Checkbox;