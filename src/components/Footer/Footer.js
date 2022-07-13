import React from "react";
import { footerLinks } from "../../utils/data";
import LinksItem from "../LinksItem/LinksItem";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info">
        <p className="footer__copyright">
          &copy; {new Date().getFullYear().toString()}
        </p>
        <ul className="footer__links">
          {
            footerLinks.map(({ title, link }, index) => (
              <LinksItem key={index} listSelector="footer__links-item" linkSelector="footer__link" title={title} link={link} />
            ))
          }
        </ul>
      </div>
    </footer>
  )
}

export default Footer;