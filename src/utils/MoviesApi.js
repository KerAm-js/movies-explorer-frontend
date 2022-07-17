import { BEATFILM_BASE_URL } from './constants';
import { checkResponse } from './utils';

export const getMovies = async () => {
  return fetch(`${BEATFILM_BASE_URL}/beatfilm-movies`).then(res => checkResponse(res))
}