import * as A from './actiontypes';

const getEmptyAuthor = () => ({
  id: -1,
  name: '',
  email: '',
  slug: '',
});


const INITIAL_STATE = {
  items: [],
  fetching: false,
  fetched: false,
  errors: {},
  saving: false,
  saved: true,
  slugEditable: false,
  currentAuthor: getEmptyAuthor(),
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
        saving: false,
        saved: true,
        errors: {},
        items: [action.result].concat(state.items),
        currentAuthor: getEmptyAuthor(),
        slugEditable: false,
      });
    case A.UPDATED:
      return Object.assign({}, state, {
        currentAuthor: getEmptyAuthor(),
        errors: {},
        items: state.items.map(item => {
          if (item.id === action.result.id) {
            return action.result;
          }
          return item;
        }),
        saved: true,
        saving: false,
        slugEditable: false,
      });
    case A.UPDATE_ERROR:
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        errors: action.result,
        slugEditable: (action.result.slug ? true : false),
      });
    case A.SAVE_ERROR:
      return Object.assign({}, state, {
        saving: false,
        saved: false,
        errors: action.result,
        slugEditable: (action.result.slug ? true : false),
      });
    case A.CHANGE_KEY:
      return Object.assign({}, state, {
        currentAuthor: Object.assign({}, state.currentAuthor, {
          [action.key]: action.value,
        })
      });
    case A.RESET_FORM:
      return Object.assign({}, state, {
        currentAuthor: getEmptyAuthor(),
        errors: {},
      });
    case A.SET_CURRENT_AUTHOR:
      return Object.assign({}, state, {
        currentAuthor: {
          id: state.items[action.index].id,
          name: state.items[action.index].name,
          email: state.items[action.index].email,
          slug: state.items[action.index].slug,
        },
        errors: {},
      });
    case A.RESET:
      return INITIAL_STATE;
    default: return state;
  }
}
