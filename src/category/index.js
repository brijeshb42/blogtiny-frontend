import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Title from 'react-document-title';

import Wrapper from 'components/basewrapper';
import { startFetch, startSave, reset } from './actioncreators';
import { randomColor } from 'util';

export class CategoryPage extends React.Component {

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
    const { items, fetched, fetching, saving, errors } = this.props.categories;
    let hasError = "";
    if (errors.title) {
      hasError = errors.title;
    }
    let inputClass = "control";
    if (saving) {
      inputClass += " is-loading";
    }
    return (
      <Title title={fetching ? "Loading Categories..." : "Categories List"}>
        <Wrapper className="panel center-align category-list">
          <h5 className="title is-5">Categories</h5>
          <div className="columns">
            <div className="column">
              <form onSubmit={this.onSubmit}>
                <p className={inputClass}>
                  <input ref="title" className={"input" + (hasError ? " is-danger" : "") } type="text" placeholder="Category Name" />
                  {hasError ? <span className="help is-danger">{errors.title}</span> : null}
                </p>
                <p className="control">
                  <button className="button is-primary">Create</button>
                </p>
              </form>
            </div>
          </div>
          <ul>
            {fetching === true ? <h4>Loading...</h4> : null}
            {fetched && items.length < 1 ? <h4>No categories created.</h4> : null}
            <li className="meta-item-list has-color">
              {items.map(category => (
                <Link to={'/categories/' + category.id + '/articles'} key={category.id}>
                  <span className={"tag is-success is-medium"}>
                    {category.title}
                  </span>
                </Link>
              ))}
            </li>
          </ul>
        </Wrapper>
      </Title>
    );
  }
}

const mapStateToProps = ({ categories }, ownProps) => ({
  categories,
});

const mapDispatchToProps = (dispatch) => ({
  startFetch: () => dispatch(startFetch()),
  startSave: (title) => dispatch(startSave(title)),
  reset: () => dispatch(reset()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
