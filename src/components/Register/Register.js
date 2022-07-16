import React from "react";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import './/Register.css';

function Register({ 
  name, 
  onNameChange, 
  nameError, 
  isNameValid,
  email,
  emailError,
  isEmailValid,
  onEmailChange,
  password,
  passwordError,
  isPasswordValid,
  onPasswordChange,
  isFormValid,
  onSignupHandler,
  formError,
}) {
  
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