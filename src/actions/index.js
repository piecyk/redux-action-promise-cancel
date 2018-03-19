// fetch
const fQuery = query => new Promise(resolve => setTimeout(() =>
  resolve(`form server: ${query}`), 1000));

// simple wrapper
const PromiseCancelled = 'PromiseCancelled';

const defferCancel = deffered => {
  let _reject;
  const deffer = new Promise((resolve, reject) => {
    _reject = reject;
    deffered.then(resolve, reject);
  });
  deffer.cancel = () => {
    // xhr.abort()
    _reject(new Error(PromiseCancelled));
  }
  return deffer
}

// export const FETCH_QUERY = 'FETCH_QUERY'
export const FETCH_QUERY_PENDING = 'FETCH_QUERY_PENDING';
export const FETCH_QUERY_CANCELED = 'FETCH_QUERY_CANCELED';
export const FETCH_QUERY_REJECTED = 'FETCH_QUERY_REJECTED';
export const FETCH_QUERY_FULFILLED = 'FETCH_QUERY_FULFILLED';

export const fetchQuery = (query) => {
  return dispatch => {
    dispatch({type: FETCH_QUERY_PENDING});
    const deffer = defferCancel(fQuery(query));
    deffer.then(
      payload => {
        dispatch({type: FETCH_QUERY_FULFILLED, payload});
      }, error => {
        dispatch(error.message === PromiseCancelled ?
          {type: FETCH_QUERY_CANCELED} :
          {type: FETCH_QUERY_REJECTED, payload: error}
        );
      }
    );
    return deffer;
  }
}

export const UPDATE_QUERY = 'UPDATE_QUERY'
export const updateQuery = (query) => {
  return {
    type: 'UPDATE_QUERY',
    query
  }
}