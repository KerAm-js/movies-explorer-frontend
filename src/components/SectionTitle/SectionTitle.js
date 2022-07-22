import React from "react";
import './SectionTitle.css';

function SectionTitle ({ title, className }) {
  return (
    <h2 className={`section-title ${className}`}>
      {title}
    </h2>
  )
}

export default SectionTitle;