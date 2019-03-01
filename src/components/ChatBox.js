import React, { Component } from 'react';
import {MessageList} from './MessageList';
import {MessageInput} from './MessageInput';
import {notifyMe} from './notif-handler';


export class ChatBox extends Component {

  //const socket;
  isActive = false;

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://10.205.55.139:3030');
    window.onfocus = function () {
      window.isActive = true;
    };

    window.onblur = function () {
      window.isActive = false;
    };

    this.getDate = this.getDate.bind(this);
    this.getTime = this.getTime.bind(this);
    this.state = {
      messages: [],
      username: this.props.username,
      userList: []
    };

        // Connection opened
    this.socket.addEventListener('open', (event) => {
        this.socket.send(JSON.stringify({mtype: "conn_update", username: this.state.username}));
        //this.setState({userList: JSON.parse(event.data).userList})
    });

    // Listen for messages
    this.socket.addEventListener('message', (event) => {
        console.log('Message from server ', JSON.stringify(event.data));
        if(JSON.parse(event.data).mtype==="conn_update") {
          console.log(event.data)
          this.setState({userList: JSON.parse(event.data).userList})
        } else {
          this.messageReceived(event.data);
        }
    });

    this.sendMessage = this.sendMessage.bind(this);
    this.messageReceived = this.messageReceived.bind(this);
  }

  messageReceived(msg) {
    msg = JSON.parse(msg);
    console.log("Recieved..", msg, this.state.messages);
    this.setState({
      messages: [...this.state.messages, {from: msg.from, id: Date.now(), message: msg.message, meta: {date: this.getDate(), time: this.getTime()}}]
    });
    console.log(this.isActive)
    if(!window.isActive) {
      notifyMe(msg.message);
    }
  }

  sendMessage(message) {
    //console.log(getSmiley(message));
    console.log(message, "Sending", this.state.messages);
    this.setState({
      messages: [...this.state.messages, {from: this.state.username, id: Date.now(), message: message, meta: {date: this.getDate(), time: this.getTime()}}]
    });
    this.socket.send(JSON.stringify({message: message, from: this.state.username}));
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
    let userList = this.state.userList;
    return (
      <div className="chat-box">
        <div className="box-header">
          <nav>
            <div className="nav-wrapper">
              <a href="#abc" className="brand-logo">Non-Junks</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><a href="#abc">Close</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="box-body">
          <div className="people-list-box">
              <div className="people-list">
                {
                  userList.map((item) => {
                    return <div className="people-list-item" key={item.username}>{item.username} <span></span></div>
                  })
                }
              </div>
          </div>
          <div className="box-main">
            <MessageList messageList = {this.state.messages}/>
            <div className="box-footer">
              <MessageInput handleMessage={this.sendMessage}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
