import React from 'react';

export default class MetaForm extends React.Component {
  render() {
    return (
      <form onSubmit={e => e.preventDefault()}>
        <label className="label">Title</label>
        <p className="control">
          <input className="input" type="text" placeholder="Text input" />
        </p>
      </form>
    );
  }
}
