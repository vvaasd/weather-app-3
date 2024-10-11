export const getIsCityFavorite = (cityName, favoriteCities) => {
  return favoriteCities.some((cityInfo) => cityInfo.name === cityName);
};
