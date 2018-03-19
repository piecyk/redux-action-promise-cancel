import {UPDATE_QUERY} from './../actions';

export default function (state, action) {
  switch (action.type) {
    case UPDATE_QUERY: {
      return {
        ...state,
        query: action.query
      }
    }
    case 'FETCH_QUERY_FULFILLED': {
      return {
        ...state,
        resolvedData: action.payload
      }
    }
    default:
      return state
  }
}