/**
 * Devuelve una serie de funciones para manipular la api localStorage de forma más sencilla
 * @returns {Object}
 */
export function storage () {
  
  function create ( name, value ) {
    localStorage.setItem(name, value);
    return value
  }

  function read ( name ) {
    const get = localStorage.getItem(name);
    if (get) {
      return get;
    } else {
      return ""
    }
  }

  function remove ( name ) {
    if (read(name)) {
      localStorage.removeItem(name);
      return true
    } else {
      return false
    }
  }

  function update ( name, value ) {
    create( name, value )
  }

  function clear () {
    return localStorage.clear();
  }

  return {
    create,
    read,
    remove,
    update,
    clear
  }
}