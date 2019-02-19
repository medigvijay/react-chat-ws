import React, { Component } from 'react';

export class MessageItem extends Component {
  constructor(props) {
  	super(props);
    this.sanitizeMessage = this.sanitizeMessage.bind(this);
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({});
  }

  sanitizeMessage(message) {
    let arr = message.split("\n");
    for(let i = 0; i < arr.length && arr.length > 1; i++) {
      if(arr[i].trim() !== "") {
      	arr[i] = "<p>"+arr[i]+"</p>";
      }
    }
    return (<div>{arr.join("")}</div>);
  }
  render() {
  	let message = this.props.message;
    return (
      <div className="message-item" id={message.id} ref={el => { this.el = el; }}>
      	<div className="message-meta">
	      	<div className="message-by">{message.from}</div>
	      	<div className="message-at">{message.meta.time}</div>
      	</div>
      	<div className="message-body" >
      		{message.body}
      	</div>
      </div>
    );
  }
}
