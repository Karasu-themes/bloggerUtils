/**
 * Convierte un string a un tipo de dato válido de javascript
 * @param {String} str 
 * @returns Devuelve el tipo de valor correcto
 */
export function typos (str) {
  if (str == 'true') {
    return true
  } else if (str == 'false') {
    return false
  } else if (!isNaN(str)) {
    return Number(str);
  } else {
    return str
  }
}