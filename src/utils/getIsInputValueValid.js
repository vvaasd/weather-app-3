export const getIsInputValueValid = (str) => {
  const regex = /^[а-яА-ЯёЁйЙa-zA-Z0-9\s-]+$/;

  if (!str.length) {
    return true;
  }

  return Boolean(regex.test(str));
};
