import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };

    // this.handleChange = this.handleChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }
  /* handleChange(e) {
    this.setState({ value: e.target.value });
  } */
  keyPress(e) {
    if (e.keyCode == 13) {
      this.props.chatData.addMessage(e.target.value, this.props.chatData.currentUser.name);
    }
  }
  render() {
    const userName = this.props.chatData.currentUser.name;

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={userName} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.keyPress}
        />
      </footer>
    );
  }
}

export default ChatBar;
