import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'app';
import NotFound from 'components/notfound';

const logPageView = () => {
  console.log(window.location.pathname + window.location.search);
};

export default ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('home').default)
        });}}
      />
      <Route path="authors" getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('author').default);
        });
      }}
      />
      <Route path="categories" getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('category').default);
        });
      }}
      />
      <Route path="tags" getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('tag').default);
        });
      }}
      />
      <Route path="articles/new" getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('editor').default);
        });
      }}
      />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
