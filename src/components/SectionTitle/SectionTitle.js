import React from "react";
import './SectionTitle.css';

function SectionTitle ({ title }) {
  return (
    <div className="title-container">
      <h2 className="section-title">
        {title}
      </h2>
    </div>
  )
}

export default SectionTitle;