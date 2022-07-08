import React, { useState } from "react";
import Button from "../Button/Button";
import arrow from '../../images/arrow.svg';
import './Search.css';
import Checkbox from "../Checkbox/Checkbox";

function Search() {

  const [isChecked, setIsChecked] = useState(false);

  const setChecked = evt => {
    evt.preventDefault();
    setIsChecked(!isChecked);
  }

  const searchHanlder = evt => {
    evt.preventDefault();
  }

  return (
    <section className="search">
      <form className="search__form">
        <div className="search__input-container">
          <input required type="text" placeholder="Фильм" className="search__input" />
          <Button type="submit" className="search__btn" onClick={searchHanlder}>
            <img src={arrow} alt="Стрелка" className="search__img" />
          </Button>
        </div>
        <Checkbox title="Короткометражки" isChecked={isChecked} setChecked={setChecked} />
      </form>
    </section>
  )
}

export default Search;