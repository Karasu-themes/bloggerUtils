import { parserAttr } from "./parserAttr";
import {
  postID,
  blogID,
  link,
  summary,
  getFirstImage,
  title,
  body,
  thumbnail,
  author,
  time,
  labels
} from "./blogger";

/**
 * Devuelve un objeto ordenado en base a un objeto extraído de los feed de blogger
 * @param {Object} data - Objeto extraído del feed de blogger 
 * @param {Object} config  - Objeto de configuración
 * @returns {Object}
 */

export function parser(data, config = {}) {
  const _CONTENT = body(data, config);
  const _FIRST_IMAGE = getFirstImage(_CONTENT, config.defaultImage || "#noImageFounded")

  return {
    title: title(data, config),
    url: link(data),
    postID: postID(data, config),
    blogID: blogID(data, config),
    image: _FIRST_IMAGE,
    thumbnail: thumbnail(data, _FIRST_IMAGE),
    body: body(data, config),
    summary: summary(_CONTENT, config.summary || 96),
    labels: labels(data),
    ...author(data),
    ...time(data),
    ...parserAttr(_CONTENT)
  }

}