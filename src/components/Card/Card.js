import React, { useState } from "react";
import Button from "../Button/Button";
import likeImg from '../../images/like.svg';
import disLikeImg from '../../images/dislike.svg';
import removeImg from '../../images/remove.svg';
import { BEATFILM_BASE_URL } from "../../utils/constants";
import './Card.css';
import { getDurationString } from "../../utils/utils";

function Card({ nameRU, image, duration, isSavedMoviesPage, trailerLink, onLikeCardHandler, onDisLikeCardHanlder }) {

  const [liked, setLiked] = useState();
  const durationString = getDurationString(duration);

  return (
    <li className="card">
      <a target="_blank" href={trailerLink} className="card__trailer-link">
        <img src={`${BEATFILM_BASE_URL}${image.url}`} className="card__img" alt="Заставка" />
      </a>
      <div className="card__info">
        <p className="card__title">
          {
            nameRU
          }
        </p>
        {
            !isSavedMoviesPage
              ? (<Button type="button" className="card__like-btn" onClick={onLikeCardHandler} >
                  <img className="card__like-img" src={liked ? likeImg : disLikeImg} alt="Нравится" />
                </Button>)
              : (<Button type="button" className="card__like-btn" onClick={onDisLikeCardHanlder}>
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