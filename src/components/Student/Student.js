import React from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import studentPhoto from '../../images/student-photo.jpeg';
import './Student.css'; 
import arrow from '../../images/link-arrow.svg';
import { portfolio, studentContacts } from "../../utils/data";
import LinksItem from "../LinksItem/LinksItem";

function Student() {
  return (
    <section className="student">
        <SectionTitle title="Студент" />
        <div className="student__info">
          <div className="student__text">
            <div className="student__main-text">
              <h3 className="student__name">
                Амир
              </h3>
              <p className="student__profession">
                Веб-разработчик, 19 лет
              </p>
              <p className="student__about">
                Родился в Урус-Мартане, Чеченская Республика. Живу в Москве. 
                Учусь на факультете "Инженерный бизнес и менеджмент" в МГТУ им. Н.Э. Баумана, 4 курс.
                Начал изучать программирование в начале 2021 года. В августе и сентябре того же года работал
                над корпоративным приложением для компании Orgres, а в октябре начал учиться в Практикуме. 
                Сейчас работаю на немецкую криптобиржу Globiance, занимаюсь разработкой мобильного приложения. 
              </p>
            </div>
            <ul className="student__contacts">
              {
                studentContacts.map(({ title, link }, index) => (
                  <LinksItem key={index} itemSelector="student__contact" linkSelector="student__contact-link" title={title} link={link} />
                ))
              }
            </ul>
          </div>
          <img className="student__photo" src={studentPhoto} alt="Фотография" />
        </div>
        <p className="student__portfolio">Портфолио</p>
        <ul className="student__projects">
          {
            portfolio.map(({ title, link }, index) => (
              <LinksItem key={index} itemSelector="student__project" linkSelector="student__project-link" link={link}>
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