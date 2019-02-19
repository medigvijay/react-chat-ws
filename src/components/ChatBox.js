import React, { Component } from 'react';
import {MessageList} from './MessageList';
import {MessageInput} from './MessageInput';

export class ChatBox extends Component {

  //const socket;

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:8081');
    this.sendMessage = this.sendMessage.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getTime = this.getTime.bind(this);
    this.state = {
      messages: []
    }

        // Connection opened
    this.socket.addEventListener('open', (event) => {
        //this.socket.send('Hello Server!');
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
        console.log('Message from server ', event.data);
        this.messageReceived(event.data);
    });
  }

  messageReceived(msg) {
    this.setState({
      messages: [...this.state.messages, {from: "Bot", id: Date.now(), body: msg, meta: {date: this.getDate(), time: this.getTime()}}]
    });
  }

  sendMessage(message) {
    this.setState({
      messages: [...this.state.messages, {from: "Me", id: Date.now(), body: message, meta: {date: this.getDate(), time: this.getTime()}}]
    });
    this.socket.send(message);
  }

  getDate() {
    let date = new Date();
    let str = date.getDay() + ":" + date.getMonth() + ":" + date.getFullYear();
    return str;
  }
  getTime() {
    let date = new Date();
    let str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return str;
  }

  sanitizeMessage(message) {
    let arr = message.split("\n");
    for(let i = 0; i < arr; i++) {
      if(arr[i].trim() !== "")
        arr[i] = "<p>"+arr[i]+"</p>";
    }
    return arr.join("");
  }
  render() {
    return (
      <div className="chat-box">
        <div className="box-header">
          <nav>
            <div className="nav-wrapper">
              <a href="#abc" className="brand-logo">React-Node</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#abc">Close</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="box-main">
          <MessageList messageList = {this.state.messages}/>
        </div>
        <div className="box-footer">
          <MessageInput handleMessage={this.sendMessage}/>
        </div>
      </div>
    );
  }
}
