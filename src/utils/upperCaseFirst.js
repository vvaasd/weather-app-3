export function upperCaseFirst(str) {
  return typeof str === 'string'
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : '';
}
