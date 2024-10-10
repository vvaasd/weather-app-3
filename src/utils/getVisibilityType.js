export const getVisibilityType = (visibilityKm) => {
  if (visibilityKm < 2) {
    return 'Плохая';
  } else if (visibilityKm > 4) {
    return 'Хорошая';
  }
  return 'Нормальная';
};
