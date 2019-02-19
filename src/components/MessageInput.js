import React, { Component } from 'react';

export class MessageInput extends Component {
  
  constructor(props) {
  	super(props);
  	this.sendMessage = this.sendMessage.bind(this);
  	this.handleMessage = this.props.handleMessage;
  }
  sendMessage(event) {
  	let message = "";
    if(event.key === "Enter" && !event.shiftKey) {
    	if(event.target.value.trim() !== "") {
    		message = event.target.value.trim();
    		event.target.value = "";
    		this.sendToServer(message);
    	} else {
    		event.preventDefault();
    		return false;
    	}
    } else if(event.key === "Enter" && event.shiftKey) {
    	message = event.target.value + "\n";
    	event.target.value = message;
    }
  }

  sendToServer(message) {
  	console.log(message);
  	this.handleMessage(message);
  }



  render() {
    return (
      <div className="message-input">
      	<div className="row">
            <form className="col s12">
              <div className="row">
                <div className="col s12">
                  <textarea id="message-input-field" className="materialize-textarea"
                  onKeyPress={ this.sendMessage }
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
