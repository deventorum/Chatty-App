import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { message } = this.props;
    const userName = message.username ? message.username : 'Anonymous';
    const { content } = message;
    return (
      <div className="message">
        <span className="message-username">{userName}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }
}

export default Message;
