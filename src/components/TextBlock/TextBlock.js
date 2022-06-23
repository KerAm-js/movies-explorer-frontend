import React from "react";
import './TextBlock.css';

function TextBlock({ title, description }) {
  return (
    <li className="text-block">
      <h3 className="text-block__title">
        {title}
      </h3>
      <p className="text-block__description">
        {description}
      </p>
    </li>
  )
}

export default TextBlock;
