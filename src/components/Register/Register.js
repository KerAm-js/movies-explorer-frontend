import React from "react";
import { nameRegex } from "../../utils/constants";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import './/Register.css';

function Register({ name, onNameChange, nameError, isNameValid }) {
  return (
    <div className="register">
      <AuthPageHeader title="Добро пожаловать!" />
      <Form 
        inputs={[
          {
            type: 'text', 
            label: 'Имя', 
            inputId: 'form-name', 
            name: 'form-name',
            error: nameError,
            isValid: isNameValid,
            minLength: 2, 
            maxLength: 30,
            required: true,
            value: name, 
            onChange: onNameChange
          },
          {
            type: 'email', 
            label: 'E-mail', 
            inputId: 'form-e-mail', 
            name: 'form-e-mail',
            required: true,
          },
          {
            type: 'password', 
            label: 'Пароль', 
            inputId: 'form-password', 
            name: 'form-password',
            required: true,
          },
        ]}
        submitTitle="Зарегистрироваться"
      />
      <LinkFooter text="Уже зарегистрированы?" link="/signin" linkTitle="Войти" />
    </div>
  )
}

export default Register;