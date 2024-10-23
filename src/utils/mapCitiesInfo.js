export const mapCitiesInfo = (citiesInfo) => {
  return citiesInfo.map((cityInfo) => {
    const { name, lat, lon, place_id } = cityInfo;
    return { name, lat, lon, id: place_id };
  });
};
