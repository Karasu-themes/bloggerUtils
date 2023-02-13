/**
 * 
 * @param {String} str 
 * @returns {Object} - Retorna un objeto en base a los atributos data obtenidos
 */
export function parserAttr (content) {
    let obj = {};
    const regExp = /data-[\w-]+=[\"']+[^\"']+[\"']+/g;
    const matches = content.match(regExp);
  
    if (matches.length == 0) return {};
    
    matches.forEach(n => {
      
      const value = n.match(/[\"'].+[\"']/)[0].replace(/\"|\'/g, '');
  
      const key = (n.match(/data-.+=/g)[0].replace(/data-|=/g, '')).replace(/-\w+/g, function (m) {
        const str = m.replace('-', '');
        return str[0].toUpperCase() + str.slice(1)
      });
  
      obj[key] = value;
    });
  
    return obj;
}