import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import { useInputValidator } from "../Validator/InputValidator";
import { nameRegex, nameInvalidMessage, submitErrorMessage } from "../../utils/constants";
import { TOKEN } from "../../utils/localStorageConstants";
import { singin, signup, getUserInfo } from "../../utils/MainApi";
import './/Register.css';
import { UserContext } from "../../contexts/UserContext";

function Register() {

  const [name, nameError, isNameValid, onNameChange, setNameDefaults] = useInputValidator({pattern: nameRegex, errorMessage: nameInvalidMessage});
  const [email, emailError, isEmailValid, onEmailChange, setEmailDefaults] = useInputValidator({});
  const [password, passwordError, isPasswordValid, onPasswordChange, setPasswordDefaults] =useInputValidator({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formError, setFormError] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const setDefaults = () => {
    setEmailDefaults();
    setPasswordDefaults();
    setNameDefaults();
    setIsFormValid(false);
    setFormError('');
  }

  const onSignupHandler = evt => {
    if (evt) {
      evt.preventDefault();
    }
    signup({ email, name, password })
      .then(() => {
        if (formError) {
          setFormError("");
        }
        setUser({ email, name });
        return singin({ email, password })
      })
      .then((res) => {
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
      .catch((err) => {
        console.log(err);
        setIsFormValid(submitErrorMessage);
      });
  };

  //для обновления состояния кнопки сабмита формы регистрации
  useEffect(() => {
    if (isNameValid && isEmailValid && isPasswordValid) {
      setIsFormValid(true);
      return;
    }
    setIsFormValid(false);
  }, [isNameValid, isEmailValid, isPasswordValid]);
  
  return (
    <div className="register">
      <AuthPageHeader title="Добро пожаловать!" />
      <Form 
        isValid={isFormValid}
        onSubmit={onSignupHandler}
        error={formError}
        //пропсы для инпутов
        inputs={[
          {
            type: 'text', 
            label: 'Имя', 
            inputId: 'form-name', 
            name: 'form-name',
            minLength: 2, 
            maxLength: 30,
            required: true,
            value: name, 
            onChange: onNameChange,
            error: nameError,
            isValid: isNameValid,
          },
          {
            type: 'email', 
            label: 'E-mail', 
            inputId: 'form-e-mail', 
            name: 'form-e-mail',
            required: true,
            value: email,
            onChange: onEmailChange,
            error: emailError,
            isValid: isEmailValid,
          },
          {
            type: 'password', 
            label: 'Пароль', 
            inputId: 'form-password', 
            name: 'form-password',
            required: true,
            value: password,
            onChange: onPasswordChange,
            error: passwordError,
            isValid: isPasswordValid,
          },
        ]}
        submitTitle="Зарегистрироваться"
      />
      <LinkFooter text="Уже зарегистрированы?" link="/signin" linkTitle="Войти" />
    </div>
  )
}

export default Register;