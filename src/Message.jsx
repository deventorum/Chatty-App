import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { message } = this.props;
    if (message.type === 'incomingMessage') {
      const userName = message.username ? message.username : 'Anonymous';
      const { content } = message;
      const userStyle = {
        color: message.color
      };

      return (
        <div className="message">
          <span className="message-username" style={userStyle}>
            {userName}
          </span>
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
