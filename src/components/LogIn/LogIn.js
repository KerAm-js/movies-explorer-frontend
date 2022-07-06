import React from "react";
import AuthPageHeader from "../AuthPageHeader/AuthPageHeader";
import Form from "../Form/Form";
import LinkFooter from "../LinkFooter/LinkFooter";
import './LogIn.css';

function LogIn() {
  return (
    <div className="log-in">
      <AuthPageHeader title="Рады видеть!" />
      <Form 
        inputs={[
          {type: 'email', label: 'E-mail', inputId: 'form-e-mail'},
          {type: 'password', label: 'Пароль', inputId: 'form-password]'},
        ]}
      />
      <LinkFooter text="Ещё не зарегистрированы?" link="/signup" linkTitle="Регистрация" />
    </div>
  )
}

export default LogIn;