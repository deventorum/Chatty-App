import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      userName: this.props.chatData.currentUser.name,
      newUserName: ''
    };

    this.keyPressMessage = this.keyPressMessage.bind(this);
    this.keyPressUser = this.keyPressUser.bind(this);
  }

  // Fires up am event on Enter button press
  keyPressMessage(e) {
    if (e.keyCode == 13) {
      this.props.chatData.addMessage(e.target.value);
      e.target.value = '';
    }
  }
  keyPressUser(e) {
    if (e.keyCode == 13) {
      if (this.state.userName !== e.target.value) {
        this.props.chatData.addNotification(this.state.userName, e.target.value);
        this.setState({
          userName: e.target.value
        });
      }
    }
  }
  render() {
    //const userName = this.props.chatData.currentUser.name;

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder={this.props.chatData.currentUser.name}
          onKeyDown={this.keyPressUser}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyDown={this.keyPressMessage}
        />
      </footer>
    );
  }
}

export default ChatBar;
