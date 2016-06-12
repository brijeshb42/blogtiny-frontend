import './app.scss';

import React from 'react';
import Title from 'react-document-title';

import Header from 'components/header';
import Button from 'components/button';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Title title="Loading...">
        <div className="">
          <Header />
          <div className="container is-fluid">
            {this.props.children}
          </div>
        </div>
      </Title>
    );
  }
};
