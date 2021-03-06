import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Title from 'react-document-title';

import Wrapper from 'components/basewrapper';
import { startFetch, startSave, reset } from './actioncreators';
import { randomColor } from 'util';

export class TagPage extends React.Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.startFetch();
    this.refs.title.focus();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.startSave(this.refs.title.value);
    this.refs.title.value = "";
  }

  render() {
    const { items, fetched, fetching, saving, errors } = this.props.tags;
    let hasError = "";
    if (errors.title) {
      hasError = errors.title;
    }
    let inputClass = "control";
    if (saving) {
      inputClass += " is-loading";
    }
    // if (hasError) {
    //   inputClass += ""
    // }
    return (
      <Title title={fetching ? "Loading Tags..." : "Tags"}>
        <Wrapper className="card center-align category-list">
          <h5 className="title is-5">Tags</h5>
          <div className="columns">
            <div className="column">
              <form onSubmit={this.onSubmit}>
                <p className={inputClass}>
                  <input ref="title" className={"input" + (hasError ? " is-danger" : "") } type="text" placeholder="Tag Name" />
                  {hasError ? <span className="help is-danger">{errors.title}</span> : null}
                </p>
                <p className="control">
                  <button className="button is-primary">Create</button>
                </p>
              </form>
            </div>
          </div>
          <ul>
            {fetching === true ? <li>Loading...</li> : null}
            {fetched && items.length < 1 ? <li>No tags created.</li> : null}
            <li className="meta-item-list has-color">{items.map(tag => (
              <Link to={'/tags/' + tag.id + '/articles'} key={tag.id}>
                <span className={"tag is-danger is-medium"}>
                  {tag.title}
                </span>
              </Link>
            ))}</li>
          </ul>
        </Wrapper>
      </Title>
    );
  }
}

const mapStateToProps = ({ tags }, ownProps) => ({
  tags,
});

const mapDispatchToProps = (dispatch) => ({
  startFetch: () => dispatch(startFetch()),
  startSave: (title) => dispatch(startSave(title)),
  reset: () => dispatch(reset()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPage);
