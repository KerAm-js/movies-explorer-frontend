import React from "react";
import './SectionTitle.css';

function SectionTitle ({ title }) {
  return (
    <h2 className="section__title">
      {title}
    </h2>
  )
}

export default SectionTitle;