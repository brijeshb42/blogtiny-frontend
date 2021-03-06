import React from 'react';

export default class AuthorForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleEmail = this.toggleEmail.bind(this);
  }

  componentDidMount() {
    this.refs.name.focus();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.author.id != this.props.author.id) {
      setTimeout(() => this.refs.name.focus(), 0);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  onClick(e) {
    e.preventDefault();
    this.props.reset();
    setTimeout(() => this.refs.name.focus(), 0);
  }

  toggleEmail(e) {
    const { author } = this.props;
    this.props.onChange('public_email', !author.public_email);
  }

  render() {
    const { errors, author, slugEditable } = this.props;
    return (
      <div className="card is-fullwidth">
        {author.id > 0 && <span className="close-mini" style={{ marginTop: 10 }} onClick={this.onClick}>&times;</span>}
        <form className="card-content" onSubmit={this.onSubmit}>
          <h6 className="title is-6">{author.id < 0 ? "Create New Author" : "Edit Author"}</h6>
          {Object.keys(author).map((key) => {
            if (key === 'id' || key === 'public_email') {
              return null;
            }
            const itemError = errors[key] ? true : false;
            return (
              <p className="control" key={key}>
                <label htmlFor={"user-" + key }>{key.split('_').join(' ')}</label>
                <input
                  id={"user-" + key }
                  className={ "input" + (itemError ? " is-danger" : "") }
                  ref={key}
                  type="text"
                  placeholder={key}
                  value={author[key]}
                  onChange={(e) => {
                    this.props.onChange(key, e.target.value);
                  }}
                  disabled={!slugEditable && key === "slug"}
                />
                {itemError ? <span className="help is-danger">{errors[key]}</span> : null}
              </p>
            );
          })}
          <p className="control">
            <label>
              Make Email Public
              <input type="checkbox" checked={author.public_email} onChange={this.toggleEmail} />
            </label>
          </p>
          <p className="control">
            <button className="button is-primary" type="submit">
              {author.id < 0 ? "Create" : "Update"}
            </button>
            <button className="button is-link" onClick={this.onClick}>
              Reset
            </button>
          </p>
        </form>
      </div>
    );
  }
}
