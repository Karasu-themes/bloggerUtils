export function directiveDefault(str, data) {
  return str.replace(/\{(\w+)\}/g, function (matches) {
    const key = matches.replace(/\{|\}/g, '');
    return data[key] || "";
  })
}

export function directiveIf(str, data) {
  return str.replace(/{if(\.\w+\s)[^]*?\/}/g, function (matches) {
    const key = matches.match(/if.\w+/)[0].replace('if.', '');
    if (data[key]) return matches.replace(/{if.\w+|\/\}/g, '');
    else return "";
  })
}

export function directiveElse(str, data) {
  return str.replace(/{else(\.\w+\s)[^]*?\/}/g, function (matches) {
    const key = matches.match(/else.\w+/)[0].replace('else.', '');
    if (!data[key]) return matches.replace(/{else.\w+|\/\}/g, '');
    else return "";
  })
}

export function directiveImage (str, data) {
  return str.replace(/\{image(.+)\}/g, function (matches) {
    const _PARAM = matches.replace(/\{image|\(|\)|\}/g, '');
    return data['thumbnail'] ? data['thumbnail'].replace(/s\B\d{2,4}(-?w\d{2,4})?-c/, _PARAM) : "";
  })
}

export function directiveLoop(str, data) {

  // Comprueba si un texto contiene uno de los valores contenido en el parametro @toCompare
  function isIncluded(txt, toCompare) {
    return toCompare.some(e => txt.includes(e))
  }

  function hook(str) {
    const actionName = str.replace(/\[(.+)\]/g, '');
    const params = str.replace(/include|exclude|remove|\[|\]/g, '').split(',').map(n => n.trim());
  
    return {
      action: actionName.trim(),
      params
    }
  
  }

  return str.replace(/{loop\.(.+\s)[^]*?\/}/g, function (matches) {
    let items = "";
    const { action, params } = /\((.+)\)/.test(matches) ? hook(matches.match(/\((.+)\)/)[1]) : {},
      key = matches.match(/loop.\w+/)[0].replace('loop.', ''),
      loopStr = matches.replace(/{loop\.(.+\s)|\/}/g, '');

    // Comprobamos que exista la propiedad en el objeto (Cambiar a la sentencia switch dependiendo del caso)
    if (data[key]) {
      const result = data[key];

      // Hook para remover ciertos elementos en un array en base a un valor
      if (action == "remove") {

        result.filter(el => !params.includes(el)).forEach((value, index) => {
          items += loopStr.replace(/@value/g, value).replace(/@index/g, (index + 1));
        });

        // Hook para mostrar solo los elementos de un array que contengan un conjunto de caracteres especifico.
      } else if (action == "include") {
        result.filter(v => isIncluded(v, params)).forEach((value, index) => {
          items += loopStr.replace(/@value/g, value).replace(/@index/g, (index + 1));
        });

        // Hook para quita del array los elementos que contengan un caracter especifico
      } else if (action == "exclude") {
        result.filter(v => !isIncluded(v, params)).forEach((value, index) => {
          items += loopStr.replace(/@value/g, value).replace(/@index/g, (index + 1));
        });
      } else { // Si no hay hooks presentes, devolver todos los elementos del array

        result.forEach((value, index) => {
          items += loopStr.replace(/@value/g, value).replace(/@index/g, (index + 1));
        });

      }

      return items;

    } else return "";

  })
};