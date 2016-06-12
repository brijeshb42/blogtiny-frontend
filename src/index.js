import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

// import createHistory from 'history/lib/createHistory';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';

import Fetch from 'network';
import App from 'app';
import reducers from 'reducers';
import Routes from 'routes';

const appHistory = browserHistory;

const historyMiddleware = routerMiddleware(appHistory);


const store = createStore(
  reducers,
  applyMiddleware(thunk, historyMiddleware)
);

window.store = store;

const history = syncHistoryWithStore(appHistory, store);

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById("app")
);
