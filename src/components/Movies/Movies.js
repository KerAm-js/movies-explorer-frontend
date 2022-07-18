import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import More from "../More/More";
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";
import { MOVIES,  REQUEST_TEXT, IS_SHORT_FILM, TOKEN} from "../../utils/localStorageConstants";
import { BEATFILM_BASE_URL, errorMessage } from "../../utils/constants";
import { getUploadMoviesCount } from "../../utils/utils";
import { addMovie, removeMovie, getSavedMovies } from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import './Movies.css';

function Movies() {

  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem(MOVIES)) || []);
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [uploadMoviesCount, setUploadMoviesCount] = useState(getUploadMoviesCount(window.innerWidth, { isInitial: false }));
  const [isMoviesRequested, setIsMoviesRequested] = useState(false);
  const [searchText, setSearchText] = useState(localStorage.getItem(REQUEST_TEXT) || "");
  const [isShortFilm, setIsShortFilm] = useState(Boolean(localStorage.getItem(IS_SHORT_FILM)) || false);
  const [searchError, setSearchError] = useState("");

  const onSearchTextChange = (evt) => setSearchText(evt.target.value);
  const toggleIsShortFilm = () => setIsShortFilm(!isShortFilm);

  //лайки фильмам ставятся по следующему принципу:
  //  все фильмы на странице movies имеют свойства isLiked и savedId 
  //  isLiked - показывает, поставлен лайк или нет
  //  savedId - это id фильма на нашем бэкенде, он пригодится для удаления лайка на странице movies
  //  эти свойства будут добавлены объектам фильмов в следующих случаях:
  //  1) при загрузке фильмов из стороннего API, с помощью сверки со списком сохранённых фильмов на нашем API,
  //     так как мы можем только читать данные из стороннего API, полномочий вносить свои изменения для лайков у нас нет,
  //     особенно это будет необходимо, если мы возьмём другое API, на котором список фильмов будет меняться
  //     и нам потребуется подгружать фильмы только из сети, а не из локального хранилища
  //  2) при нажатии на кнопку лайка: необходимо показать пользователю, что он лайнкул карточку, при помощи свойства isLiked
  //     а также необходимо сохранить id фильма из нашего API в свойстве savedId, 
  //     чтобы пользователь при желании могу сразу же убрать лайк прямо на странице movies

  //сверка с сохранёнными фильмами
  const setLikes = (movies, savedMovies) => {
    movies.forEach(movie => {
      const savedVariant = savedMovies.find(item => item.movieId === movie.id)
      movie.isLiked = false;
      movie.savedId = null;
      if (savedVariant) {
        movie.savedId = savedVariant._id;
        movie.isLiked = true;
        return;
      }
    })
    return movies;
  }

  //расстановка лайков для всех фильмов
  const setLikesToSearchedMovies = movies => {
    const token = localStorage.getItem(TOKEN);
    return getSavedMovies({ token }).then(svdMovies => {
      setLikes(movies, svdMovies);
      return movies;
    })

  }

  //для первой подгрузки фильмов
  const setMoviesInitial = (data) => {
    setMovies(
      data.slice(
        0,
        getUploadMoviesCount(window.innerWidth, { isInitial: true })
      )
    );
  };

  //нажатие кнопки "ещё"
  const onMoreHandler = () => {
    const data = JSON.parse(localStorage.getItem(MOVIES)).slice(
      movies.length,
      movies.length + uploadMoviesCount
    );
    setMovies((prev) => [...prev, ...data]);
  };

  const searchAllMovies = evt => {
    if (evt) {
      evt.preventDefault();
    }
    
    const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
    setIsLoaderShown(!storedMovies);
    
    if (!isMoviesRequested) {
      setIsMoviesRequested(true);
    }

    localStorage.setItem(REQUEST_TEXT, searchText);
    localStorage.setItem(IS_SHORT_FILM, isShortFilm ? "1" : "");

    if (!storedMovies || storedMovies.length === 0) {
      getMovies()
        .then((data) => {
          return setLikesToSearchedMovies(data); //раставляем лайки для подгруженных фильмов 
          ///будет необходимо, если я позже воспользуюсь другим API, который будет обновлятся со временем
        })
        .then(data => {
          setMoviesInitial(data);
          localStorage.setItem(MOVIES, JSON.stringify(data));
          setSearchError("");
        })
        .catch((err) => {
          console.log(err);
          setSearchError(errorMessage);
        })
        .finally(() => setIsLoaderShown(false));
        return;
    } 
    setMoviesInitial(storedMovies);
    setSearchError('');
    setIsLoaderShown(false);

  }

  const onLikeCardHandler = ({ movie }) => {
    const token = localStorage.getItem(TOKEN);
    const { id, image, created_at, updated_at, isLiked, savedId, ...movieData } = movie;
    const savedMovie = { 
      movieId: id, 
      image: `${BEATFILM_BASE_URL}${image.url}`,
      thumbnail: `${BEATFILM_BASE_URL}${image.formats.thumbnail.url}`,
      ...movieData  
    }
    //возвращаем промис запроса для дальнейшей обработки в компоненте карточки
    return addMovie({ movie: savedMovie, token }).then(svdMovie => {
      const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
      const likedMovie = storedMovies.find(movie => svdMovie.movieId === movie.id);
      
      likedMovie.isLiked = true;
      likedMovie.savedId = svdMovie._id;

      localStorage.setItem(MOVIES, JSON.stringify(storedMovies));
      setMoviesInitial(storedMovies);
    }) 
  };

  const onDisLikeCardHanlder = ({ id, movieId }) => {
    const token = localStorage.getItem(TOKEN);
    //возвращаем результат запроса для дальнейшей обработки в компоненте карточки
    return removeMovie({id, token}).then(() => {
      const storedMovies = JSON.parse(localStorage.getItem(MOVIES));
      const likedMovie = storedMovies.find(movie => movieId === movie.id);

      likedMovie.isLiked = false;
      likedMovie.savedId = null;

      localStorage.setItem(MOVIES, JSON.stringify(storedMovies));
      setMoviesInitial(storedMovies);
    })
  };

  const onWidthChange = (evt) => {
    const count = getUploadMoviesCount(evt.target.innerWidth, {
      isInitial: false,
    });
    setUploadMoviesCount(count);
  };

  useEffect(() => {
    window.addEventListener("resize", onWidthChange);
    return () => window.removeEventListener("resize", onWidthChange);
  });

  return (
    <div className="movies">
      <Header />
      <Search
        onSubmit={searchAllMovies}
        onChange={onSearchTextChange}
        text={searchText}
        isChecked={isShortFilm}
        setChecked={toggleIsShortFilm}
      />
      {
        !isMoviesRequested 
          ? null
          : isLoaderShown
            ? <Preloader />
            : <Cards 
                error={searchError}
                cards={movies} 
                onLikeCardHandler={onLikeCardHandler} 
                onDisLikeCardHanlder={onDisLikeCardHanlder} 
              />
      }
      {
        (movies.length > 0 && isMoviesRequested && !searchError) ? <More onMoreHandler={onMoreHandler} /> : null
      }
      <Footer />
    </div>
  )
}

export default Movies;