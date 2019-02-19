import React, { Component } from 'react';
import './App.css';
import {ChatBox} from './components/ChatBox.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ChatBox/>
      </div>
    );
  }
}

export default App;
