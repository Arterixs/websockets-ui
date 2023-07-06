import WebSocket, { WebSocketServer } from 'ws';
import { createServer } from 'node:http';
import { httpServer } from './http_server/index.js';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

httpServer.listen(HTTP_PORT);

console.log(`Start static http server on the ${HTTP_PORT} port!`);

const server = createServer();
server.listen(WS_PORT);

const wsServer = new WebSocketServer({ server });

wsServer.on('connection', (ws: WebSocket) => {
  ws.on('message', (message: string) => {});
});
