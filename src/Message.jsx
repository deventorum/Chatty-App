import React, { Component } from 'react';

class Message extends Component {
  scrollToBottom = () => {
    this.lastMessage.scrollIntoView();
  };

  componentDidMount() {
    this.scrollToBottom();
  }

  render() {
    const { message } = this.props;
    if (message.type === 'incomingMessage') {
      const userName = message.username ? message.username : 'Anonymous';
      const { content } = message;
      const userStyle = {
        color: message.color
      };
      const userImage = message.image && <img className="user-image" src={message.image} />;

      return (
        <div
          className="message"
          ref={el => {
            this.lastMessage = el;
          }}
          style={{ border: `2px solid ${message.color}` }}
        >
          <span className="message-username" style={userStyle}>
            {userName}
          </span>
          <div>
            <p className="message-content">{content}</p>
            {userImage}
          </div>
        </div>
      );
    }
    if (message.type === 'incomingNotification') {
      const { userNameOld } = message;
      const { userNameNew } = message;
      return (
        <div className="message-system" style={{ border: `2px solid ${message.color}` }}>
          {userNameOld} has changed their name to {userNameNew}.
        </div>
      );
    }
  }
}

export default Message;
