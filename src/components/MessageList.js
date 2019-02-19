import React, { Component } from 'react';

import {MessageItem} from './MessageItem';

export class MessageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let list = this.props.messageList;
    return (
      <div className="message-list">
        {list.map((item) => {
          return <MessageItem message={item} key={item.id}/>
        })}
      </div>
    );
  }
}