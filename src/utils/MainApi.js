import { API_BASE_URL } from "./constants";
import { BEATFILM_BASE_URL } from "./constants";
import { checkResponse } from "./utils";

export const addMovie = (movie) => {

    const { id, image, updated_at, created_at, ...data } = movie;

    const body = {
        movieId: id,
        image: `${BEATFILM_BASE_URL}${image.url}`,
        thumbnail: `${BEATFILM_BASE_URL}${image.formats.thumbnail.url}`,
        ...data,
    }

    fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        body: JSON.stringify(body)
    })
}

export const removeMovie = (id, movieId) => {
    fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ movieId })
    })
}