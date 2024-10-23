export class StringService {
  static upperCaseFirst = (str) => {
    return typeof str === 'string'
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : '';
  };

  static replaceSpacesAndDashes = (str) => {
    let newStr = str.trim().replace(/-/g, '  ').split(' ');
    for (let i = 0; i < newStr.length; i++) {
      if (newStr[i].length > 0) {
        newStr[i] =
          newStr[i][0].toUpperCase() + newStr[i].substring(1).toLowerCase();
      }
    }
    return newStr.join(' ').replace(/ +|-/g, '-');
  };

  static splitStringByStart = (str, startStr) => {
    const strLowerCase = str.toLowerCase();
    const startStrLowerCase = startStr.toLowerCase();

    if (!strLowerCase.startsWith(startStrLowerCase)) {
      return [str, ''];
    }

    return [startStr, str.slice(startStr.length)];
  };

  static getIsInputValueValid = (str) => {
    const regex = /^[а-яА-ЯёЁйЙa-zA-Z0-9\s-]+$/;

    if (!str.length) {
      return true;
    }

    return Boolean(regex.test(str));
  };
}
