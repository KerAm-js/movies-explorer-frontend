import React, { useState } from "react";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Link from "../Link/Link";
import './Profile.css';

function Profile() {

  const [name, setName] = useState('Амир');
  const [emai, setEmail] = useState('95amirk@gmail.com');

  return (
    <div className="profile">
      <Header />
      <h1 className="profile__title">Привет, Амир!</h1>
      <form className="profile__form">
        <div className="profile__inputs">
          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-name">Имя</label>
            <input 
              className="profile__input" 
              id="profile-name" 
              type="text" 
              value={name} 
              onChange={text => setName(text)}
            />
          </div>
          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-e-mail">E-mail</label>
            <input 
              className="profile__input" 
              id="profile-e-mail" 
              type="text" 
              value={emai} 
              onChange={text => setEmail(text)}
            />
          </div>
        </div>
        {
          <Button type="button" className="profile__submit-btn" title="Редактировать" />
          // Для сохранения результата будет показана эта кнопка
          // <Button type="submit" className="profile__submit-btn" title="Сохранить" />
        }
      </form>
      <Link className="profile__link" title="Выйти из аккаунта" to="#" />
    </div>
  )
}

export default Profile;