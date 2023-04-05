import { stripTags } from "./stripTags";

/**
 * Devuelve el id del post
 * @param {Object} data 
 * @returns {String}
 */
export function postID(data) {
  if (/post-\d{1,}/g.test(data.id.$t)) return '';
  const _ID = data.id.$t.match(/post-\d{1,}/g)[0];
  return _ID.replace('post-', '');
}

/**
 * Devuelve el id del blog
 * @param {Object} data 
 * @returns {String}
 */
export function blogID(data) {
  if (/blog-\d{1,}/g.test(data.id.$t)) return '';
  const _ID = data.id.$t.match(/blog-\d{1,}/g)[0];
  return _ID.replace('blog-', '');
}

/**
 * Devuelve el título de la entrada
 * @param {Object} data 
 * @returns {String}
 */
export function title(data) {
  return data.title ? data.title.$t : 'No title'
}

export function body(data) {
  return data.content ? data.content.$t : (data.summary ? data.summary.$t : '');
}

/**
 * Devuelve la url obtenida de un objeto Array de feed blogger
 * @param {Array} links 
 * @returns {String}
 */
export function link(links) {
  let result = "";
  
  
  links.link.forEach(l => {
    if (l.rel == 'alternate') result = l.href;
  });

  return result;
}

/**
 * Devuelve el resumen de una entrada en base a su contenido
 * @param {String} content 
 * @param {Number} strLength 
 * @returns {String}
 */
export function summary(content, strLength) {
  const _SUMMARY = stripTags(content);
  return _SUMMARY.length > strLength ? _SUMMARY.substr(0, strLength) + "..." : _SUMMARY;
}

/**
 * Devuelve la url de la primera imagen encontrada en el contenido de una entrada
 * @param {String} content 
 * @param {String} defaultImage 
 * @returns {String}
 */
export function getFirstImage(content, defaultImage) {
  let temp = document.createElement('div');
  temp.innerHTML = content;
  let img = temp.querySelector('img');

  return img ? img.src : defaultImage;
}

/**
 * Devuelve la url de la imagen en miniatura de la entrada si ésta ha sido subida a blogger
 * @param {Object} data 
 * @param {String|URLimage} getFirstImage 
 * @returns {String}
 */
export function thumbnail (data, getFirstImage) {
  return data.media$thumbnail ? data.media$thumbnail.url : getFirstImage
}

/**
 * Devuelve un objeto con información sobre el autor de la entrada
 * @param {Object} data 
 * @returns {Object}
 */
export function author (data) {
  return {
    authorName: data.name ? data.name.$t : "Unknown",
    authorUri: data.uri ? data.uri.$t : "#noProfileUrl",
  }
}

/**
 * Devuelve un objeto con información de la fecha de la entrada
 * @param {Object} data 
 * @returns {Object}
 */
export function time (data) {
  return {
    datePost: new Date(data.published.$t).toLocaleDateString(),
    postUpdate: new Date(data.updated.$t).toLocaleDateString(),
    datePostIso8601: data.published.$t,
  }
} 

/**
 * Devuelve un array que contiene las etiquetas contenidas en una entrada
 * @param {Object} data 
 * @returns {Array}
 */
export function labels (data) {
  return data.category ? data.category.map(el => el.term) : []
}