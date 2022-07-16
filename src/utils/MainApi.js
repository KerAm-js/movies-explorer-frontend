import { API_BASE_URL } from "./constants";
import { BEATFILM_BASE_URL } from "./constants";
import { checkResponse } from "./utils";

export const signup = ({ email, name, password }) => {
    return fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            name,
            password,
        })
    }).then(res => checkResponse(res))
}

export const singin = ({ email, password }) => {
    return fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
        })
    }).then(res => checkResponse(res))
}

export const addMovie = (movie) => {

    const { id, image, updated_at, created_at, ...data } = movie;

    const body = {
        movieId: id,
        image: `${BEATFILM_BASE_URL}${image.url}`,
        thumbnail: `${BEATFILM_BASE_URL}${image.formats.thumbnail.url}`,
        ...data,
    }

    return fetch(`${API_BASE_URL}/movies`, {
        method: "POST",
        body: JSON.stringify(body)
    }).then(res => checkResponse(res))
}

export const removeMovie = (id, movieId) => {
    return fetch(`${API_BASE_URL}/movies/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ movieId })
    }).then(res => checkResponse(res))
}