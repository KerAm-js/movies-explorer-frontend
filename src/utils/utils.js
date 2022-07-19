import { CURRENT_USER, IS_SHORT_FILM, IS_SHORT_FILM_SAVED, MOVIES, REQUEST_TEXT, REQUEST_TEXT_SAVED, SAVED_MOVIES } from "./localStorageConstants";
import { BEATFILM_BASE_URL } from "./constants";

export const checkResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject({ error: `Ошибка ${res.status}`, status: res.status, message: res.message});
}

export const getUploadMoviesCount = (width, { isInitial }) => {
  if (width >= 1280) {
    return isInitial ? 12 : 3;
  } else if (width < 1280 && width > 891) {
    return isInitial ? 8 : 2;
  } else if (width <= 891) {
    return isInitial ? 5 : 1;
  }
  return isInitial ? 12 : 3;
}

export const getDurationString = duration => {
  const hours = Math.ceil(duration / 60);
  const minutes = duration % 60;
  return `${hours}ч ${minutes}м`;
}

export const setLikes = (movies, savedMovies) => {
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

export const setLikesToSearchedMovies = uploadedMovies => {
  const storedSavedMovies = JSON.parse(localStorage.getItem(SAVED_MOVIES));

  if (storedSavedMovies && storedSavedMovies.length > 0) {
    setLikes(uploadedMovies, storedSavedMovies);
    return uploadedMovies;
  }
  return uploadedMovies;
}

export const prepareMovieForSaving = movie => {
  const { id, image, created_at, updated_at, isLiked, savedId, ...movieData } = movie;
  const savedMovie = { 
    movieId: id, 
    image: `${BEATFILM_BASE_URL}${image.url}`,
    thumbnail: `${BEATFILM_BASE_URL}${image.formats.thumbnail.url}`,
    ...movieData  
  }
  return savedMovie;
}

export const clearLocalStorage = () => {
  localStorage.setItem(MOVIES, JSON.stringify([]));
  localStorage.setItem(SAVED_MOVIES, JSON.stringify([]));
  localStorage.removeItem(IS_SHORT_FILM);
  localStorage.removeItem(IS_SHORT_FILM_SAVED);
  localStorage.removeItem(REQUEST_TEXT);
  localStorage.removeItem(REQUEST_TEXT_SAVED);
  localStorage.removeItem(CURRENT_USER);
}