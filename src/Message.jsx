import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { message } = this.props;
    if (message.type === 'incomingMessage') {
      const userName = message.username ? message.username : 'Anonymous';
      const { content } = message;

      return (
        <div className="message">
          <span className="message-username">{userName}</span>
          <span className="message-content">{content}</span>
        </div>
      );
    }
    if (message.type === 'incomingNotification') {
      const { userNameOld } = message;
      const { userNameNew } = message;
      return (
        <div className="message system">
          {userNameOld} has changed their name to {userNameNew}.
        </div>
      );
    }
  }
}

export default Message;
