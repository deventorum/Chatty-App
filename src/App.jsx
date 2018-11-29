import React, { Component } from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: { name: 'Anonymous' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clients: '0 users'
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
      content: content,
      color: this.state.color
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addNotification(userNameOld, userNameNew) {
    const newNotification = {
      type: 'postNotification',
      userNameOld,
      userNameNew,
      color: this.state.color
    };
    console.log(newNotification);
    this.socket.send(JSON.stringify(newNotification));
    this.setState({
      currentUser: { name: userNameNew }
    });
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
      switch (incomingData.type) {
        case 'incomingNotification':
          this.setState({
            messages: [...this.state.messages, incomingData]
          });
          break;
        case 'incomingMessage':
          this.setState({
            messages: [...this.state.messages, incomingData]
          });
          break;
        case 'clientData':
          const numClients = incomingData.numberOfClients;
          if (numClients === 1) {
            this.setState({
              clients: `${numClients} user`
            });
          } else {
            this.setState({
              clients: `${numClients} users`
            });
          }
          break;
        case 'clientProfile':
          console.log('Some Client Info');
          this.setState({
            color: incomingData.color
          });
          break;
        default:
          console.log('Somethin went wrong!');
      }
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
          <span className="clients-number">{this.state.clients} online</span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar chatData={chatData} />
      </div>
    );
  }
}
export default App;
