import React, { useState } from "react";
import Button from "../Button/Button";
import likeImg from '../../images/like.svg';
import disLikeImg from '../../images/dislike.svg';
import removeImg from '../../images/remove.svg';
import { BEATFILM_BASE_URL } from "../../utils/constants";
import './Card.css';

function Card({ nameRU, image, duration, isLiked, isSavedMoviesPage }) {

  const [liked, setLiked] = useState(isLiked);

  return (
    <li className="card">
      <img src={`${BEATFILM_BASE_URL}${image.url}`} className="card__img" alt="Заставка" />
      <div className="card__info">
        <p className="card__title">
          {
            nameRU
          }
        </p>
        {
            !isSavedMoviesPage
              ? (<Button type="button" className="card__like-btn" onClick={() => setLiked(!liked)} >
                  <img className="card__like-img" src={liked ? likeImg : disLikeImg} alt="Нравится" />
                </Button>)
              : (<Button type="button" className="card__like-btn" onClick={() => setLiked(!liked)}>
                  <img className="card__like-img" src={removeImg} alt="Нравится" />
                </Button>)
          }
      </div>
      <p className="card__duration">
        {
          duration
        }
      </p>
    </li>
  )
}

export default Card;