import React from "react";
import Button from "../Button/Button";
import arrow from '../../images/arrow.svg';
import './Search.css';
import Checkbox from "../Checkbox/Checkbox";

function Search({ onSubmit, onChange, text, isChecked, setChecked }) {
  return (
    <section className="search">
      <form onSubmit={onSubmit} className="search__form">
        <div className="search__input-container">
          <input required value={text} onChange={onChange} minLength={1} type="text" placeholder="Фильм" className="search__input" />
          <Button type="submit" className="search__btn" aria-label="Поиск">
            <img src={arrow} alt="Стрелка" className="search__img" />
          </Button>
        </div>
        <Checkbox title="Короткометражки" isChecked={isChecked} setChecked={setChecked} />
      </form>
    </section>
  )
}

export default Search;