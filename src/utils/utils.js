export const checkResponse = res => {
    if (res.ok) {
        return res.json();
    }
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