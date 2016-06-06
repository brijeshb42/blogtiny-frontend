import * as A from './actiontypes';

const INITIAL_STATE = {
  items: [],
  fetching: false,
  fetched: false,
};


export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case A.FETCHING:
      return Object.assign({}, state, {
        fetching: true,
      });
    case A.FETCHED:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        items: action.result,
      });
    case A.FETCH_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: false,
        items: []
      });
    default: return state;
  }
}
