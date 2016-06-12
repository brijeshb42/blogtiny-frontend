import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Title from 'react-document-title';

import Wrapper from 'components/basewrapper';
import { startFetch } from 'home/actioncreators';

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.startFetch();
  }

  render() {
    const { items, fetched, fetching } = this.props.articles;
    return (
      <Title title={fetching ? "Loading Article..." : "Articles"}>
      <Wrapper className="article-list center-align">
        <h5 className="title is-5">{fetching === true ? "Loading..." : "Articles"}</h5>
        <div>
          <Link className="button is-outlined is-large" to="/articles/new">
            <span className="icon">
              <i className="fa fa-newspaper-o"></i>
            </span>
            <span>Create New</span>
          </Link>
        </div>
        {items.map(article => (
          <div className="card is-fullwidth" key={article.id}>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">
                    <Link to={ "/articles/" + article.id }>
                      {article.title != "" ? article.title : "[No Title] Created on - " + moment.utc(article.date).local().format('MMM Do, YYYY')}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <footer className="card-footer">
              <Link className="card-footer-item" to={ "/authors/" + article.author.id }>
                {article.author.name}
              </Link>
            </footer>
          </div>
        ))}
      </Wrapper>
      </Title>
    );
  }
}

const mapStateToProps = ({ articles }, ownProps) => ({
  articles,
});

const mapDispatchToProps = (dispatch) => ({
  startFetch: () => dispatch(startFetch()),
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
