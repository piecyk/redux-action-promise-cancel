// fetch
const fQuery = query => new Promise(resolve => setTimeout(() =>
  resolve(`form server: ${query}`), 1000));

// simple wrapper
const defferCancel = deffered => {
  let _reject;
  const deffer = new Promise((resolve, reject) => {
    _reject = reject;
    deffered.then(resolve, reject);
  });
  deffer.cancel = (reason) => {
    // xhr.abort()
    _reject(reason)
  }
  return deffer
}

export const FETCH_QUERY = 'FETCH_QUERY'
export const fetchQuery = (query) => {
  return dispatch => {
    const payload = defferCancel(fQuery(query))
    dispatch({
      type: FETCH_QUERY,
      payload
    });
    return payload;
  }
}

export const UPDATE_QUERY = 'UPDATE_QUERY'
export const updateQuery = (query) => {
  return {
    type: 'UPDATE_QUERY',
    query
  }
}