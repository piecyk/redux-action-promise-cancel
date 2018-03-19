import {applyMiddleware, createStore} from "redux";
import {createLogger} from 'redux-logger'
import promiseMiddleware from "redux-promise-middleware";
import thunk from "redux-thunk";

import reducer from "reducers";

const configureStore = (state = {}) => {
  return createStore(
    reducer,
    state,
    applyMiddleware(
      thunk,
      promiseMiddleware(),
      createLogger()
    )
  )
};

export default configureStore;
