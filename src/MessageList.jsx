import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const { messages } = this.props;
    const messageItems = messages.map(message => (
      <Message message={message} key={message.id.toString()} />
    ));
    return <main className="messages">{messageItems}</main>;
  }
}

export default MessageList;
