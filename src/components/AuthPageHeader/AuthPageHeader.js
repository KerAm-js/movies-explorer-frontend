import React from "react";
import Logo from '../Logo/Logo';
import './AuthPageHeader.css';

function AuthPageHeader({ title }) {
  return (
    <header className="auth-page-header">
      <div className="auth-page-header__content">
        <Logo />
        <h1 className="auth-page-header__title">{title}</h1>
      </div>
    </header>
  )
}

export default AuthPageHeader;