import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      userName: this.props.chatData.currentUser.name
    };

    this.keyPress = this.keyPress.bind(this);
  }

  // Fires up am event on Enter button press
  keyPress(e) {
    if (e.keyCode == 13) {
      this.props.chatData.addMessage(e.target.value, this.state.userName);
    }
  }
  render() {
    //const userName = this.props.chatData.currentUser.name;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.chatData.currentUser.name}
          value={this.state.userName}
          onChange={function(e) {
            this.setState({ userName: e.target.value });
          }.bind(this)}
        />
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
