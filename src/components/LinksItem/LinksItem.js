import React from "react";
import './LinksItem.css';

function LinksItem({ itemSelector, linkSelector, link, title, children }) {
  return (
    <li className={`links-item ${itemSelector || ''}`}>
      <a target="_blank" rel="noreferrer" className={`links-item__link ${linkSelector || ''}`} href={link}>
        {
          children
            ? children
            : title
        }
      </a>
    </li>
  )
}

export default LinksItem;