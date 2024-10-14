const coefficient = 0.750064;

export const getConvertedPressure = (pressure) => {
  return Math.round(pressure * coefficient);
};
