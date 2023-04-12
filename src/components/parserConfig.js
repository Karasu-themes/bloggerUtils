/**
 * Genera un objeto de configuración en base a una cadena de texto con una sintaxis especifica.
 * @param {String} strConfig 
 * @returns {Object} Objeto clave-valor obtenido desde la sintaxis pasada por parametro
 */
export function parserConfig(strConfig) {
  const obj = {};
  const rexp = /\$[a-zA-Z]*{([^}]*)}/g;
  if (!rexp.test(strConfig)) return {};

  const matches = strConfig.match(rexp);

  matches.forEach(val => {
    const str = val;
    const key = str.replace(/\$|{(.*)}/g, '');
    const value = str.match(/{(.*)}/g)[0].replace(/{|}/g, '');
    obj[key] = value;
  })

  return matches.length ? obj : {};

}