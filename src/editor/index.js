import 'medium-draft/lib/index.css';

import React from 'react';
import Title from 'react-document-title';
import {
  Editor,
  createEmptyContent,
  createWithContent,
} from 'medium-draft';

import Wrapper from 'components/basewrapper';


export default class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: createEmptyContent(),
    };

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  // componentDidMount() {
  //   this.refs.editor.focus();
  // }

  render() {
    const { editorState } = this.state;
    return (
      <Title title="Create New Article">
        <Wrapper className="is-8 card center-align">
          <div className="card-content">
            <Editor ref="editor" editorState={editorState} onChange={this.onChange} placeholder="Write your story..." />
          </div>
        </Wrapper>
      </Title>
    );
  }
}
