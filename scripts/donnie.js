const { Worker, isMainThread } = require('worker_threads');
const WebSocket = require('ws');

const wsUrl = "wss://api.staging.chicken.gg/socket.io/?EIO=4&transport=websocket";
//const wsUrl = "ws://127.0.0.1:5000/socket.io/?EIO=4&transport=websocket";

if (isMainThread) {
  const threads = 1;
  for (let i = 0; i < threads; i++) {
      new Worker(__filename);
  }
} else {
  const createConnection = () => {
      const client = new WebSocket(wsUrl, {
          headers: {
              'X-Forwarded-For': `${
                Math.floor(Math.random() * 255) + 1
              }.${
                Math.floor(Math.random() * 255) + 1
              }.${
                Math.floor(Math.random() * 255) + 1
              }.${
                Math.floor(Math.random() * 255) + 1
              }`
          }
      });

      client.on('open', () => {
          client.send('40');
          setInterval(() => client.send('3'), 20000);
      });

      client.on('message', (response) => {
          console.log(response.toString('utf8'));
          setInterval(() => client.ping());
      });

      client.on('error', (error) => console.error('WebSocket Error:', error));
  };

  setInterval(createConnection, 4000);
}