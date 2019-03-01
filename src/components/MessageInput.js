import React, { Component } from 'react';
import {EmojiPallet} from './emoji-pallet';

export class MessageInput extends Component {
  
  constructor(props) {
  	super(props);
    this.state = {
      emojiPalletVisible: false
    };
  	this.sendMessage = this.sendMessage.bind(this);
    this.emojiSelected = this.emojiSelected.bind(this);
    this.closeEmojiPallet = this.closeEmojiPallet.bind(this);
    this.toggleEmojiPallet = this.toggleEmojiPallet.bind(this);
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

  toggleEmojiPallet() {
    let opened = this.state.emojiPalletVisible;
    this.setState({emojiPalletVisible: !opened});
  }

  closeEmojiPallet() {
    this.setState({emojiPalletVisible: false});
  }

  emojiSelected(emoji) {
    this.el.value=this.el.value+emoji;
  }




  render() {
    return (
      <div className="message-input">
        <EmojiPallet visible={this.state.emojiPalletVisible} onEmojiSelect={this.emojiSelected}/>
      	<div className="row">
            <form className="">
              <div className="row input-area">
                <div className="input-box">
                  <textarea id="message-input-field" className="materialize-textarea"
                  onKeyPress={ this.sendMessage } ref={el => { this.el = el; }}
                  onFocus={this.closeEmojiPallet}
                  ></textarea>
                  </div>
                  <div className="icon-btn">
                  <a class="btn-floating waves-effect waves-light red emoji-btn" onClick={this.toggleEmojiPallet}><i class="material-icons">face</i></a>
                </div>
              </div>
            </form>
          </div>
      </div>
    );
  }
}
