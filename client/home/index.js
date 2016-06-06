import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router';
import Title from 'react-document-title';

import { startFetch } from 'home/actioncreators';

export class HomePage extends React.Component {
  componentDidMount() {
    this.props.startFetch();
  }

  render() {
    const { items, fetched, fetching } = this.props.articles;
    return (
      <Title title={fetching ? "Loading Article..." : "Article List"}>
      <ul>
        {fetching === true ? <li><progress class="progress is-primary" value="30" max="100">30%</progress></li> : <li><h5 className="title is-5">Articles</h5></li>}
        {fetched && items.length < 1 ? <li>No articles yet. Create one now.</li> : null}
        {items.map(article => (
          <li key={article.id}>
            <h4 className="title is-4">
              <Link to={ "/articles/" + article.id }>
                {article.title != "" ? article.title : "[No Title] Created " + moment.utc(article.date).local().fromNow()}
              </Link>
            </h4>
            <small>– <Link to={"/authors/" + article.author.id} >{article.author.name}</Link></small>
          </li>
        ))}
      </ul>
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
