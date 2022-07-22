import React from "react";
import Link from "../Link/Link";
import './LinkFooter.css';

function LinkFooter({ text, link, linkTitle }) {
  return (
    <div className="link-footer">
      <p className="link-footer__text">{text}</p>
      <Link className="link-footer__link" title={linkTitle} to={link} />
    </div>
  )
}

export default LinkFooter;