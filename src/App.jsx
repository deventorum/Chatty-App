import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.socket = null;
    this.addMessage = this.addMessage.bind(this);
    this.addNotification = this.addNotification.bind(this);
  }

  // sends input data to the server
  addMessage(content) {
    const newMessage = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addNotification(userNameOld, userNameNew) {
    const newNotification = {
      type: 'postNotification',
      userNameOld,
      userNameNew
    };
    console.log(newNotification);
    this.socket.send(JSON.stringify(newNotification));
  }

  componentDidMount() {
    // Creates web socket client
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = function(event) {
      console.log(`Client connection is now ${event.type}`);
    };

    // Updates message list when new message comes in
    this.socket.onmessage = event => {
      const incomingData = JSON.parse(event.data);
      if (incomingData.type === 'incomingNotification') {
        this.setState({
          currentUser: { name: incomingData.userNameNew }
        });
      }
      this.setState({
        messages: [...this.state.messages, incomingData]
      });
      console.log(incomingData);
    };
    // code to handle incoming message
  }
  render() {
    const chatData = {
      currentUser: this.state.currentUser,
      addMessage: this.addMessage,
      addNotification: this.addNotification
    };
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar chatData={chatData} />
      </div>
    );
  }
}
export default App;
