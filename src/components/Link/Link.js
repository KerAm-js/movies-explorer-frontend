import React from "react";
import { NavLink } from "react-router-dom";
import './Link.css';

function Link({ className, title, ...props }) {
  return (
    <NavLink className={`link ${className}`} { ...props }>
      {title}
    </NavLink>
  )
}

export default Link;