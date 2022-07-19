import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button";
import Link from "../Link/Link";
import menuBurger from '../../images/menu-burger.svg';
import menuClose from '../../images/close.svg';
import profile_img from '../../images/account-icon.svg';
import './Header.css';
import Logo from "../Logo/Logo";
import { UserContext } from "../../contexts/UserContext";


function Header({ isMainPage }) {

  const [opened, setOpened] = useState(false);
  const { user } = useContext(UserContext)

  const drawerSelector = opened ? 'header__nav_opened' : '';
  const menuBtn = opened ? menuClose : menuBurger;

  const toggleDrawer = () => setOpened(!opened);
  
  return (
    <header className={`header ${ isMainPage && 'header_main-page'}`}>
      <div className={`header__content ${ !isMainPage && 'header__content_movies-page' }`}>
        <Logo />
        {
          !user.email && !user.name 
            ? (
              <div className={`header__auth-links header__auth-links_hidden`}> 
                <Link to="/signup" className="header__signup-link" title='Регистрация' />
                <NavLink to="/signin">
                  <Button type="button" className="header__signin-link" title='Войти' />
                </NavLink>
              </div>
            )
            : (
              <>
                <nav className={`header__nav ${drawerSelector}`}>
                  <ul className="header__links-list">
                    {
                      !isMainPage && (
                        <li className="header__link-item">
                          <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive 
                              ? "link header__nav-link header__nav-link_active" 
                              : "link header__nav-link header__nav-link_main"
                            }
                          >
                            Главная
                          </NavLink>
                        </li>
                      )
                    }
                    <li className="header__link-item">
                      <NavLink 
                        to="/movies" 
                        className={({ isActive }) => isActive 
                          ? "link header__nav-link header__nav-link_active" 
                          : "link header__nav-link"
                        }
                      >
                        Фильмы
                      </NavLink>
                    </li>
                    <li className="header__link-item">
                      <NavLink 
                        to="/saved-movies"
                        className={({ isActive }) => isActive 
                          ? "link header__nav-link header__nav-link_active" 
                          : "link header__nav-link"
                        }
                      >
                        Сохранённые фильмы
                      </NavLink>
                    </li>
                  </ul>
                  <NavLink className="header__profile-link" to="/profile">
                    <Button type="button" className="header__profile-btn">
                      <img className="header__profile-img" src={profile_img} alt="Логотип" />
                      Аккаунт 
                    </Button>
                  </NavLink>
                </nav>
                <Button type="button" className="header__menu-btn" onClick={toggleDrawer}>
                  <img className="header__menu-img" src={menuBtn} alt="Меню" />
                </Button>
              </>
            )
        }
      </div>
    </header>
  )
}

export default Header;