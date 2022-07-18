import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import { TOKEN } from "../../utils/localStorageConstants";
import { useInputValidator } from "../Validator/InputValidator";
import './LogIn.css';
import { UserContext } from "../../contexts/UserContext";
import { singin, getUserInfo } from "../../utils/MainApi";
import { submitErrorMessage } from "../../utils/constants";

function LogIn() {

  const [email, emailError, isEmailValid, onEmailChange, setEmailDefaults] = useInputValidator({});
  const [password, passwordError, isPasswordValid, onPasswordChange, setPasswordDefaults] =useInputValidator({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const setDefaults = () => {
    setEmailDefaults();
    setPasswordDefaults();
    setIsFormValid(false);
    setFormError("");
  }

  const onSignInHandler = evt => {
    if (evt) {
      evt.preventDefault();
    }
    singin({ email, password, })
      .then(res => {
        if (res.token) {
          localStorage.setItem(TOKEN, res.token);
        }
        setDefaults();
        return getUserInfo({ token: res.token })
      })
      .then(res => {
        const { email, name } = res
        setUser({ email, name });
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
        setFormError(submitErrorMessage);
      })
  } 

  //для обновления состояния кнопки сабмита формы авториззации
  useEffect(() => {
    if (isEmailValid && isPasswordValid) {
      setIsFormValid(true);
      return;
    }
    setIsFormValid(false);
  }, [isEmailValid, isPasswordValid]);

  return (
    <div className="log-in">
      <AuthPageHeader title="Рады видеть!" />
      <Form 
        isValid={isFormValid}
        onSubmit={onSignInHandler}
        error={formError}
        //пропсы для инпутов
        inputs={[
          {
            type: 'email', 
            label: 'E-mail', 
            inputId: 'form-e-mail',
            required: true,
            value: email,
            onChange: onEmailChange,
            error: emailError,
            isValid: isEmailValid
          },
          {
            type: 'password', 
            label: 'Пароль', 
            inputId: 'form-password]',
            required: true,
            value: password,
            onChange: onPasswordChange,
            error: passwordError,
            isValid: isPasswordValid,
          },
        ]}
        submitTitle="Войти"
      />
      <LinkFooter text="Ещё не зарегистрированы?" link="/signup" linkTitle="Регистрация" />
    </div>
  )
}

export default LogIn;