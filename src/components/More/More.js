import React from "react";
import Button from "../Button/Button";
import './More.css';

function More({ onMoreHandler }) {
  return (
    <section className="more">
      <Button type="submit" className="more__btn" title="Ещё" onClick={onMoreHandler} />
    </section>
  )
}

export default More;