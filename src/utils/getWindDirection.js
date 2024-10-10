import { WIND_DIRECTIONS } from 'constants';

export const getWindDirection = (deg) => {
  return WIND_DIRECTIONS[Math.round(deg / 45) % 8];
};
