import React from "react";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import './LogIn.css';

function LogIn({
  email,
  emailError,
  isEmailValid,
  onEmailChange,
  password,
  passwordError,
  isPasswordValid,
  onPasswordChange,
  isFormValid,
  onSigninHandler,
  formError
}) {
  return (
    <div className="log-in">
      <AuthPageHeader title="Рады видеть!" />
      <Form 
        isValid={isFormValid}
        onSubmit={onSigninHandler}
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