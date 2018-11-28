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
  }

  addMessage(content, userName) {
    const newMessage = {
      username: userName,
      content: content
    };
    /* this.setState({
      messages: [...this.state.messages, newMessage]
    }); */
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {
    // Add a new message to the list of messages in the data store

    /* const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' }; */
    // const messages = this.state.messages.concat(newMessage);

    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.

    // this.setState({ messages: messages });
    this.socket = new WebSocket('ws://localhost:3001/');
    this.socket.onopen = function(event) {
      console.log(`Client connection is now ${event.type}`);
    };
    this.socket.onmessage = event => {
      const incomingMessage = JSON.parse(event.data);
      this.setState({
        messages: [...this.state.messages, incomingMessage]
      });
      console.log(incomingMessage);
      // code to handle incoming message
    };
  }
  render() {
    const chatData = {
      currentUser: this.state.currentUser,
      addMessage: this.addMessage
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
