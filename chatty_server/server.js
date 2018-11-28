const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require ('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

// Sends information to all clients regarding how many clients are connected
function howManyClients() {
  let numberOfClients = 0
  wss.clients.forEach(function each(client) {
    numberOfClients++
  })
  wss.clients.forEach(function each(client) {
    const clientData = {
      type: 'clientData',
      numberOfClients
    }
  
    client.send(JSON.stringify(clientData));
  })
}

const colors = ['red', 'green', 'blue', 'yellow']

wss.on('connection', (ws) => {
  
  const newClient = {
    type: 'clientProfile',
    color: colors[Math.floor(Math.random() * 4)]
  }
  console.log(newClient);
  ws.send(JSON.stringify(newClient))


  // sends data on connect event
  howManyClients();
  

  // Handles messages from a client-side
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === ws.OPEN) {
        const newData = JSON.parse(data)
        if (newData.type === 'postMessage') {
          newData.type = 'incomingMessage';
        }
        if (newData.type === 'postNotification') {
          newData.type = 'incomingNotification'
        }
        newData.id = uuidv1();
        client.send(JSON.stringify(newData));
      }
    })
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // sends data when connection is terminated
    howManyClients();
    console.log('Client disconnected');

  })
});