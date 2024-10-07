export function validateInputValue(str) {
  const regex =  /^[а-яА-ЯёЁйЙ0-9\s-]+$/
  if (!str.length) {
    return true
  }

  if (regex.test(str)) {
    return true
  } else {
    return false
  }
}