/**
 * Quita todas las etiquetas html de un string
 * @param {String|HTML} htmlCode 
 * @returns 
 */
export function stripTags ( htmlCode ) {
  return htmlCode.replace(/<[^>]*>?/g, '')
}