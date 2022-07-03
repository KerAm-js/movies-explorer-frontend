import React from "react";
import Button from "../Button/Button";
import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader">
      <Button className="preloader__btn" title="Ещё" />
    </section>
  )
}

export default Preloader;