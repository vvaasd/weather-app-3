import { getConvertedPressure } from './getConvertedPressure';

export const getPressureType = (pressure) => {
  const calculatedPressure = getConvertedPressure(pressure);

  if (calculatedPressure >= 740 && calculatedPressure <= 760) {
    return 'Нормальное';
  } else if (calculatedPressure < 740) {
    return 'Низкое';
  } else {
    return 'Высокое';
  }
};
