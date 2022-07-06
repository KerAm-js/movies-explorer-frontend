import React from "react";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import './/Register.css';

function Register() {
  return (
    <div className="register">
      <AuthPageHeader title="Добро пожаловать!" />
      <Form 
        inputs={[
          {type: 'text', label: 'Имя', inputId: 'form-name'},
          {type: 'email', label: 'E-mail', inputId: 'form-e-mail'},
          {type: 'password', label: 'Пароль', inputId: 'form-password]'},
        ]}
      />
      <LinkFooter text="Уже зарегистрированы?" link="/signin" linkTitle="Войти" />
    </div>
  )
}

export default Register;