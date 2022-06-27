import React from "react";
import { technologies } from "../../utils/constants";
import SectionTitle from "../SectionTitle/SectionTitle";
import Technology from "../Technology/Technology";
import './Technologies.css';

function Technologies() {
  return (
    <section className="technologies">
        <SectionTitle title="Технологии" />
        <h4 className="technologies__title">
          7 технологий
        </h4>
        <p className="technologies__description">
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className="technologies__list">
          {
            technologies.map(tech => <Technology title={tech} />)
          }
        </ul>
    </section>
  )
}

export default Technologies;