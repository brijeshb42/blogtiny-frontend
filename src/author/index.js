import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Title from 'react-document-title';

import Wrapper from 'components/basewrapper';
import AuthorForm from 'components/authorform';
import {
  startFetch,
  setCurrentAuthor,
  reset,
  createAuthor,
  resetForm,
  changeKey } from './actioncreators';

export class AuthorPage extends React.Component {

  componentDidMount() {
    this.props.startFetch();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  render() {
    const {
      items,
      fetched,
      fetching,
      errors,
      saved,
      currentAuthor,
      slugEditable
    } = this.props.authors;
    return (
      <Title title={ fetching ? "Loading Authors..." : "Authors" }>
        <Wrapper className="is-8 center-align">
          <h5 className="title is-5">{fetching === true ? "Loading..." : "Authors"}</h5>
          {fetched && items.length < 1 ? <h6 className="subtitle">No author created.</h6> : null}
          <div className="columns">
            <div className="column is-4">
              <AuthorForm
                author={currentAuthor}
                errors={errors}
                onSubmit={this.props.createAuthor}
                slugEditable={slugEditable}
                reset={this.props.resetForm}
                onChange={this.props.changeKey}
              />
            </div>
            <div className="column is-8">
              <table className="table is-bordered is-narrow">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Slug</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {items.map((author, index) => (
                  <tr key={author.id}>
                    <td>{author.name}</td>
                    <td><a href={ "mailto:" + author.email}>{author.email}</a></td>
                    <td>{author.slug}</td>
                    <td>
                      <button
                        className="button is-info is-small"
                        onClick={() => {
                          this.props.setCurrentAuthor(index);
                        }}>Edit</button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </Wrapper>
      </Title>
    );
  }
}

const mapStateToProps = ({ authors }, ownProps) => ({
  authors,
});

const mapDispatchToProps = (dispatch) => ({
  startFetch: () => dispatch(startFetch()),
  reset: () => dispatch(reset()),
  createAuthor: (data) => dispatch(createAuthor(data)),
  resetForm: () => dispatch(resetForm()),
  changeKey: (key, value) => dispatch(changeKey(key, value)),
  setCurrentAuthor: (index) => dispatch(setCurrentAuthor(index)),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
