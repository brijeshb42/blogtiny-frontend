import './header.scss';

import React from 'react';
import { Link } from 'react-router';

export default (props) => (
  <nav className="nav is-fixed">
    <div className="nav-left">
      <Link to="/" className="nav-item">
        <span className="icon">
          <i className="fa fa-home"></i>
        </span>
      </Link>
    </div>
    <span className="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>
    <div className="nav-right nav-menu">
      <Link className="nav-item" to="/authors/">
        <span className="icon">
          <i className="fa fa-users"></i>
        </span>
        Authors
      </Link>
      <Link className="nav-item" to="/categories/">
        <span className="icon">
          <i className="fa fa-list"></i>
        </span>
        Categories
      </Link>
      <Link className="nav-item" to="/tags/">
        <span className="icon">
          <i className="fa fa-tag"></i>
        </span>
        Tags
      </Link>
    </div>
  </nav>
);
