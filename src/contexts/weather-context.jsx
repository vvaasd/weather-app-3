import { createContext, useState } from 'react';
import { MOCK_FORECAST_LIST } from '../constants/MOCK_FORECAST_LIST';

export const WeatherContext = createContext(null);
const WeatherContextProvider = ({ children }) => {
  const [city, setCity] = useState('Кременчуг-константиновское');
  const [temp, setTemp] = useState(-7);
  const [feelsLike, setFeelsLike] = useState(-11);
  const [icon, setIcon] = useState('04d');
  const [description, setDescription] = useState('Облачно');
  const [humidity, setHumidity] = useState(75);
  const [pressure, setPressure] = useState(761);
  const [visibility, setVisibility] = useState(10);
  const [wind, setWind] = useState({ deg: 300, speed: 2 });
  const [sunrise, setSunrise] = useState(1716512578);
  const [sunset, setSunset] = useState(1716573008);
  const [timezone, setTimezone] = useState(10000);
  const [forecastList, setForecastList] = useState(MOCK_FORECAST_LIST);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        temp,
        setTemp,
        feelsLike,
        setFeelsLike,
        icon,
        setIcon,
        description,
        setDescription,
        humidity,
        setHumidity,
        pressure,
        setPressure,
        visibility,
        setVisibility,
        wind,
        setWind,
        sunrise,
        setSunrise,
        sunset,
        setSunset,
        timezone,
        setTimezone,
        forecastList,
        setForecastList,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
