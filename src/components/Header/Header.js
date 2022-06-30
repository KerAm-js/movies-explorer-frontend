import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import Link from "../Link/Link";
import logo from '../../images/logo.svg';
import menuBurger from '../../images/menu-burger.svg';
import menuClose from '../../images/close.svg';
import profile_img from '../../images/account-icon.svg';
import './Header.css';


function Header({ isMainPage }) {

  const [opened, setOpened] = useState(false);

  const drawerSelector = opened ? 'header__nav_opened' : '';
  const menuBtn = opened ? menuClose : menuBurger;

  const toggleDrawer = () => setOpened(!opened);
  console.log(opened);
  
  return (
    <header className={`header ${ isMainPage && 'header_main-page'}`}>
      <div className={`header__content ${ !isMainPage && 'header__content_movies-page' }`}>
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
              <>
                <Button className="header__menu-btn" onClick={toggleDrawer}>
                  <img className="header__menu-img" src={menuBtn} alt="Меню" />
                </Button>
                <nav className={`header__nav ${drawerSelector}`}>
                  <div className="header__movies-links">
                    <Link to="#" className="header__nav-link header__movies-link header__nav-link_active" title='Фильмы' />
                    <Link to="#" className="header__nav-link header__saved-movies-link" title='Сохранённые фильмы' />
                  </div>
                  <NavLink to="#">
                    <Button className="header__profile-link">
                      <img className="header__profile-img" src={profile_img} alt="Логотип" />
                      Аккаунт 
                    </Button>
                  </NavLink>
                </nav>
              </>
            )
        }
      </div>
    </header>
  )
}

export default Header;