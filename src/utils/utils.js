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