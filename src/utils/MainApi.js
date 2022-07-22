import { API_BASE_URL } from "./constants";
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

export const getUserInfo = ({ token }) => {
  return fetch(`${API_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => checkResponse(res))
}

export const getSavedMovies = ({ token }) => {
  return fetch(`${API_BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => checkResponse(res))
}

export const addMovie = ({movie, token}) => {
  return fetch(`${API_BASE_URL}/movies`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify(movie)
  }).then(res => checkResponse(res))
}

export const removeMovie = ({id, token}) => {
  return fetch(`${API_BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  }).then(res => checkResponse(res))
}

export const updateUser = ({ email, name, token }) => {
  return fetch(`${API_BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, name })
  }).then(res => checkResponse(res))
}