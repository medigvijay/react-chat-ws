import React, { Component } from 'react';
import {emojies} from './emojies';

export class EmojiPallet extends Component {
  
  constructor(props) {
  	super(props);
    this.state = {
      visible: false,
      currentEmoji: ""
    };
    this.emojies = emojies;
    this.updateCurrentEmoji = this.updateCurrentEmoji.bind(this);
    this.selectThisEmoji = this.selectThisEmoji.bind(this);
    this.removeCurrentEmoji = this.removeCurrentEmoji.bind(this);
  }

  openEmojiPallet() {
    this.setState({visible: true});
  }

  updateCurrentEmoji(evt) {
    console.log(evt.target.alt);
    this.setState({
      currentEmoji: evt.target.alt
    })
  }

  removeCurrentEmoji(evt) {
    this.setState({
      currentEmoji: ""
    })
  }

  selectThisEmoji(evt) {
    console.log(evt.target.alt);
    this.props.onEmojiSelect(evt.target.alt);
  }



  render() {
    let list = Object.keys(this.emojies).map((key, index) => {
      return {src: this.emojies[key], alt: key};
    });

    let styleObj = {
      display: this.props.visible ? "block" : "none"
    };
    return (
      <div className="emoji-pallet" style={styleObj}>
        {list.map( (item) => {
          return (<img src={item.src} alt={item.alt} 
            onMouseOver={this.updateCurrentEmoji}
           onClick={this.selectThisEmoji}
           onMouseOut={this.removeCurrentEmoji}/>);
        })}
        <span>{this.state.currentEmoji}</span>
      </div>
    );
  }
}
