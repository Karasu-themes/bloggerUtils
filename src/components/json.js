/**
 * Permite convertir un objeto a JSON y viceversa
 * @returns {Object}
 */
export function json () {
  
  function decode (jsonString) {
    return JSON.parse(jsonString) ?? false;
  }

  function encode (jsonString) {
    return JSON.stringify(jsonString) ?? false;
  }

  return {
    decode,
    encode
  }
}