import React from "react";

import promo_img from '../../images/promo_image.svg';
import Button from "../Button/Button";
import './Promo.css';


function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__main-content">
          <div className="promo__text">
            <h1 className="promo__title">
              Учебный проект студента факультета<br className="promo__title-line-break"/> Веб-разработки.
            </h1>
            <p className="promo__subtitle">
              Листайте ниже, чтобы узнать больше про этот проект и его создателя.
            </p>
          </div>
          <img className="promo__img" src={promo_img} alt="Глобус web" />
        </div>
        <a href="#project">
          <Button className="promo__btn" title="Узнать больше"/>
        </a>
      </div>
    </section>
  )
}

export default Promo;