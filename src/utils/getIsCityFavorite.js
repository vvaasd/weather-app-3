export const getIsCityFavorite = (cityName, favorites) => {
  return favorites.some((favorite) => favorite?.city?.name === cityName);
};
