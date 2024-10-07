import { replaceSpacesAndDashes } from './replaceSpacesAndDashes';

export const checkCity = async (value) => {
  const filterValue = replaceSpacesAndDashes(value);

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${filterValue}&format=json&addressdetails=1&limit=1`
    );
    if (!response.ok) {
      throw new Error('Server Error');
    }

    const data = await response.json();
    if (!data.length) {
      console.log('Упс! Город не найден, попробуйте другой');
      return null;
    }
    const res = { lon: data[0].lon, lat: data[0].lat, city: data[0].name };
    return res;
  } catch (error) {
    console.log('Отсутствует связь со сторонним сервисом', error.message);
    return null;
  }
};
