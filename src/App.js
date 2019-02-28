import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import {ChatBox} from './components/ChatBox.js';

class App extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
  		hasUsername: localStorage.getItem("hasUsername") ? localStorage.getItem("hasUsername") : false
  	};
  	this.renderUsernameOrChat = this.renderUsernameOrChat.bind(this);
  	this.doNothing = this.doNothing.bind(this);
  	this.setUsername = this.setUsername.bind(this);
  }
  renderUsernameOrChat() {
  	if(this.state.hasUsername) {
  		return( <ChatBox username={this.state.username}/> );
  	} else {
  		return (<div className="row">
          <div className="col s12 m12">
  			<div className="card card-stacked offset-m6">
            <div className="card-content">
          <span className="card-title">IQVIA Non-Junks</span>
          <p><input ref={el => { this.el = el; }} type="text" value={this.state.username} placeholder="Enter Username" onChange={this.doNothing}/></p>
        </div>
        <div className="card-action">
          <button className="btn waves-effect waves-light" onClick={this.setUsername}>Enter</button>
        </div>
      </div>
  			 
  		</div></div>)
  	}
  }

  setUsername(evt) {
  	let name = this.el.value;
  	if(!name || name.trim() === "") {
  		alert("Enter username");
  	} else {
  		this.setState({
  			username: name,
  			hasUsername: true
  		});
  		localStorage.setItem("username", name);
  		localStorage.setItem("hasUsername", true);
  	}
  };
  doNothing(evt) {
  	this.setState({username: evt.target.value})
  }
  render() {
    return (
      <div className="app container">
      	{this.renderUsernameOrChat()}
      </div>
    );
  }
}

export default App;
