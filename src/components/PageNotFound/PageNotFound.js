import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import './PageNotFound.css';

function PageNotFound() {

  const navigate = useNavigate()

  return (
    <div className="page-not-found">
      <div className="page-not-found__main">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <Button className="page-not-found__link" title="Назад" onClick={() => navigate('/')} />
    </div>
  )
}

export default PageNotFound;