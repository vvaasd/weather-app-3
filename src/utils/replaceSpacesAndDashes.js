export function replaceSpacesAndDashes(str) {
    let newStr = str.trim().replace(/-/g, '  ').split(' ');
    for (let i = 0; i < newStr.length; i++) {
        if (newStr[i].length > 0) {
          newStr[i] = newStr[i][0].toUpperCase() + newStr[i].substring(1).toLowerCase();
        }
    }
    return newStr.join(' ').replace(/ +|-/g, '-');
  }