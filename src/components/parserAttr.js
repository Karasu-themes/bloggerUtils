/**
 * 
 * @param {String} str 
 * @returns {Object} - Retorna un objeto en base a los atributos data obtenidos
 */
export function parserAttr (content) {
    let obj = {};
    const regExp = /data-[\w-]+="([^"]+)"|data-[\w-]+='([^']+)'/g;
    const matches = content.match(regExp);
  
    if (!matches || matches.length == 0) return {};
    
    matches.forEach(n => {
      let value = n;

      value = value.replace(/data-[\w-]+=/g, '');
      value = value.replace(/^"|"$|^'|'$/g, '');

      const key = (n.match(/data-.+=/g)[0].replace(/data-|=/g, '')).replace(/-\w+/g, function (m) {
        const str = m.replace('-', '');
        return str[0].toUpperCase() + str.slice(1)
      });
      obj[key] = value;
    });
  
    return obj;
}