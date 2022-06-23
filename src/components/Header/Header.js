import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import Link from "../Link/Link";

import logo from '../../images/logo.svg';
import profile_img from '../../images/account-icon.svg';
import './Header.css';


function Header({ isMainPage }) {
  return (
    <header className={`header ${ isMainPage && 'header_main-page'}`}>
      <div className="header__content">
        <img className="header__logo" src={logo} alt="Логотип" />
        {
          isMainPage
            ? (
              <div className={`header__auth-links header__auth-links_hidden`}> 
                <Link to="#" className="header__signup-link" title='Регистрация' />
                <NavLink to="#">
                  <Button className="header__signin-link" title='Войти' />
                </NavLink>
              </div>
            )
            : (
              <nav className="header__nav">
                <div className="header__movies-links">
                  <Link to="#" className="header__nav-link header__movies-link" title='Фильмы' />
                  <Link to="#" className="header__nav-link header__saved-movies-link" title='Сохранённые фильмы' />
                </div>
                <NavLink to="#">
                  <Button className="header__profile-link">
                    <img className="header__profile-img" src={profile_img} alt="Логотип" />
                    Аккаунт 
                  </Button>
                </NavLink>
              </nav>
            )
        }
      </div>
    </header>
  )
}

export default Header;