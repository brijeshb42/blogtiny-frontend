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
            <div className="columns is-mobile">
              <div className="column is-8 is-offset-2">
                <section className="section">
                  {this.props.children}
                </section>
              </div>
            </div>
          </div>
        </div>
      </Title>
    );
  }
};
