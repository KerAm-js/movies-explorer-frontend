import React, { useState } from "react";
import Button from "../Button/Button";
import likeImg from '../../images/like.svg';
import disLikeImg from '../../images/dislike.svg';
import removeImg from '../../images/remove.svg';
import { BEATFILM_BASE_URL } from "../../utils/constants";
import './Card.css';
import { getDurationString } from "../../utils/utils";

function Card({ nameRU, image, duration, isSavedMoviesPage, trailerLink, onLikeCardHandler, onDisLikeCardHanlder, isLiked }) {

  //создаём стейт для контроля состояния кнопки
  const [liked, setLiked] = useState(isLiked);

  const durationString = getDurationString(duration);

  const onLike = () => {
    setLiked(true); //меняем заливку сразу при нажатии на лайк
    onLikeCardHandler() //делаем запрос на сохранение фильма
      .then(() => {}) //если запрос прошёл успешно, оставляем всё как есть
      .catch(err => {
        console.log(err)
        setLiked(false); //если произошла ошибка, возвращаем стейт к предыдущему состоянию
      })
  }

  const onDisLike = () => {
    setLiked(false);
    onDisLikeCardHanlder()
      .then(() => {})
      .catch(err => {
        console.log(err);
        setLiked(true);
      })
  }

  const imageUrl = isSavedMoviesPage ? image : `${BEATFILM_BASE_URL}${image.url}`;

  return (
    <li className="card">
      <a target="_blank" rel="noreferrer" href={trailerLink} className="card__trailer-link">
        <img src={imageUrl} className="card__img" alt="Заставка" />
      </a>
      <div className="card__info">
        <p className="card__title">
          {
            nameRU
          }
        </p>
        {
            !isSavedMoviesPage
              ? (<Button type="button" className="card__like-btn" onClick={liked ? onDisLike : onLike} >
                  <img className="card__like-img" src={liked ? likeImg : disLikeImg} alt="Нравится" />
                </Button>)
              : (<Button type="button" className="card__like-btn" onClick={onDisLike}>
                  <img className="card__like-img" src={removeImg} alt="Нравится" />
                </Button>)
          }
      </div>
      <p className="card__duration">
        {
          durationString
        }
      </p>
    </li>
  )
}

export default Card;