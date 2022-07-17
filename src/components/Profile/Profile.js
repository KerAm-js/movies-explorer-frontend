import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { nameInvalidMessage, nameRegex, userDataUpdated, userDataUpdateError, userEmailConflictError } from "../../utils/constants";
import { TOKEN } from "../../utils/localStorageConstants";
import { updateUser } from "../../utils/MainApi";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Link from "../Link/Link";
import { useInputValidator } from "../Validator/InputValidator";
import './Profile.css';

function Profile() {

  const {user, setUser} = useContext(UserContext);

  const [email, emailError, isEmailValid, onEmailChange, setEmailDefaults] = useInputValidator({ initialValue: user.email });
  const [name, nameError, isNameValid, onNameChange, setNameDefaults] = useInputValidator({ initialValue: user.name, pattern: nameRegex, errorMessage: nameInvalidMessage});
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [formMessage, setFormMessage] = useState('');

  const token = localStorage.getItem(TOKEN);

  const checkIsFormChanged = () => {
    const isChanged = (email !== user.email) || (name !== user.name);
    if (isChanged) {
      if (formMessage === userDataUpdated) {
        setFormMessage('');
      }
      setIsFormChanged(true);
      return;
    }
    setIsFormChanged(false);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    if (isEmailValid && isNameValid) {
      updateUser({ email, name, token })
        .then(res => {
          setUser({ email: res.email, name: res.name });
          setFormMessage(userDataUpdated);
        })
        .catch(err => {
          console.log(err);
          if (err.status === 409) {
            setFormMessage(userEmailConflictError);
            return;
          }
          setFormMessage(userDataUpdateError);
        })
    }
  }

  useEffect(() => {
    checkIsFormChanged();
    if (!isEmailValid) {
      setFormMessage(emailError);
    } else if (!isNameValid) {
      setFormMessage(nameError);
    } else {
      setFormMessage('');
    }
  }, [email, name]);

  return (
    <div className="profile">
      <Header />
      <h1 className="profile__title">{`Привет${user.name ? ', ' + user.name : ''}!`}</h1>
      <form className="profile__form" onSubmit={onSubmit}>
        <div className="profile__inputs">
          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-name">Имя</label>
            <input 
              className="profile__input" 
              id="profile-name" 
              type="text" 
              minLength={2}
              maxLength={30}
              value={name} 
              onChange={onNameChange}
            />
          </div>
          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-e-mail">E-mail</label>
            <input 
              className="profile__input" 
              id="profile-e-mail" 
              type="email" 
              value={email} 
              onChange={onEmailChange}
            />
          </div>
        </div>
        <div className="profile__submit-container">
          {
            formMessage 
            && 
            (<span 
              className={`profile__message ${(formMessage === userDataUpdated) && 'profile__message_success'}`}
            >
              {formMessage}
            </span>)
          }
          <Button 
            type="submit" 
            className={`profile__submit-btn ${(!isNameValid || !isEmailValid || !isFormChanged) && 'profile__submit-btn_disabled'}`} 
            title="Редактировать" 
            disabled={(!isNameValid || !isEmailValid || !isFormChanged)} 
          />
        </div>
      </form>
      <Link className="profile__link" title="Выйти из аккаунта" to="#" />
    </div>
  )
}

export default Profile;