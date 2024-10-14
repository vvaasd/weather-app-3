export const splitStringByStart = (str, startStr) => {
  const strLowerCase = str.toLowerCase();
  const startStrLowerCase = startStr.toLowerCase();

  if (!strLowerCase.startsWith(startStrLowerCase)) {
    return [str, ''];
  }

  return [startStr, str.slice(startStr.length)];
};
