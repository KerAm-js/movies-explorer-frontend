import React from "react";
import Link from "../Link/Link";
import './PageNotFound.css';

function PageNotFound({ history }) {
  return (
    <div className="page-not-found">
      <div className="page-not-found__main">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
      </div>
      <Link className="page-not-found__link" title="Назад" to="#" />
    </div>
  )
}

export default PageNotFound;