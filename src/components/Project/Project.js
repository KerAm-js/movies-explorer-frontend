import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import TextBlock from "../TextBlock/TextBlock";
import './Project.css';

function Project() {
  return (
    <section className="project">
      <SectionTitle title="О проекте" />
      <ul className="project__description">
        <TextBlock 
          title="Дипломный проект включал 5 этапов" 
          description={`Составление плана, работу над бэкендом, вёрстку, 
          добавление функциональности и финальные доработки.`}
        />
        <TextBlock 
          title="На выполнение диплома ушло 5 недель" 
          description={`У каждого этапа был мягкий и жёсткий дедлайн, 
          которые нужно было соблюдать, чтобы успешно защититься.`}
        />
      </ul>
      <div className="project__plan">
        <p className="project__backend-time">
          1 неделя
        </p>
        <p className="project__frontend-time">
          4 недели
        </p>
        <p className="project__backend-part">
          Back-end
        </p>
        <p className="project__frontend-part">
          Front-end
        </p>
      </div>
    </section>
  )
}

export default Project;