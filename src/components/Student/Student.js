import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import student_photo from '../../images/student-photo.png';
import './Student.css';
import arrow from '../../images/arrow.svg';
import { portfolio, studentContacts } from "../../utils/constants";
import LinksItem from "../LinksItem/LinksItem";

function Student() {
  return (
    <section className="student">

        <SectionTitle title="Студент" />
        <div className="student__info">
          <div className="student__text">
            <div className="student__main-text">
              <h3 className="student__name">
                Виталий
              </h3>
              <p className="student__profession">
                Фронтенд-разработчик, 30 лет
              </p>
              <p className="student__about">
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами 
                и ушёл с постоянной работы.
              </p>
            </div>
            <ul className="student__contacts">
              {
                studentContacts.map(({ title, link }) => (
                  <LinksItem itemSelector="student__contact" linkSelector="student__contact-link" title={title} link={link} />
                ))
              }
            </ul>
          </div>
          <img className="student__photo" src={student_photo} alt="Фотография" />
        </div>
        <p className="student__portfolio">Портфолио</p>
        <ul className="student__projects">
          {
            portfolio.map(({ title, link }) => (
              <LinksItem itemSelector="student__project" linkSelector="student__project-link" link={link}>
                {title}
                <img className="student__arrow" src={arrow} alt="Стрелка" />
              </LinksItem>
            ))
          }
        </ul>

    </section>
  )
}

export default Student;