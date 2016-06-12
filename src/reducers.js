import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import articles from 'home/reducer';
import authors from 'author/reducer';
import categories from 'category/reducer';
import tags from 'tag/reducer';

const reducers = combineReducers({
  articles,
  authors,
  categories,
  tags,
  routing: routerReducer,
});

export default reducers;
