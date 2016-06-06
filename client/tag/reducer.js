import * as A from './actiontypes';

const INITIAL_STATE = {
  items: [],
  fetching: false,
  fetched: false,
  saving: false,
  saved: true,
  errors: {}
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
    case A.SAVING:
      return Object.assign({}, state, {
        saving: true,
        saved: false,
        errors: {},
      });
    case A.SAVED:
      return Object.assign({}, state, {
        saved: true,
        saving: false,
        items: [action.result].concat(state.items),
        errors: {},
      });
    case A.SAVE_ERROR:
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        errors: action.result
      });
    default: return state;
  }
}
