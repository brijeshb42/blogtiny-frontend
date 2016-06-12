import 'draft-js/dist/Draft.css';

import React from 'react';
import Title from 'react-document-title';
import {
  Editor,
  CompositeDecorator,
  Entity,
  EditorState
} from 'draft-js';

import Wrapper from 'components/basewrapper';


export const findLinkEntities = (contentBlock, callback) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export const LinkEntity = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a className="draft-link hint--bottom" href={url} target="_blank">{props.children}</a>
  );
};


export default class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkEntity,
      },
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
    }

    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  render() {
    const { editorState } = this.state;
    return (
      <Title title="Article">
        <Wrapper className="is-8 card center-align">
          <div className="card-content">
            <Editor editorState={editorState} onChange={this.onChange} placeholder="Write your story..." />
          </div>
        </Wrapper>
      </Title>
    );
  }
}
