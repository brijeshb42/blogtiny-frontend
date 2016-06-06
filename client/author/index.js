import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Title from 'react-document-title';

import { startFetch } from './actioncreators';

export class AuthorPage extends React.Component {
  componentDidMount() {
    this.props.startFetch();
  }

  render() {
    const { items, fetched, fetching } = this.props.authors;
    return (
      <Title title={fetching ? "Loading Authors..." : "Author List"}>
        <ul>
          {fetching === true ? <li>Loading...</li> : <h5 className="title is-5">Authors</h5>}
          {items.map(author => (
            <li key={author.id}>
              <h4 className="title is-4">
                {author.name}
              </h4>
            </li>
          ))}
        </ul>
      </Title>
    );
  }
}

const mapStateToProps = ({ authors }, ownProps) => ({
  authors,
});

const mapDispatchToProps = (dispatch) => ({
  startFetch: () => dispatch(startFetch()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
