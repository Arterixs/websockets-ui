import { WebSocketServer } from 'ws';
import { httpServer } from './http_server/index.js';
import { onConnect } from './websoket/connect.js';

const HTTP_PORT = 8181;
const WS_PORT = 3000;

httpServer.listen(HTTP_PORT);

console.log(`Start static http server on the ${HTTP_PORT} port!`);

const wsServer = new WebSocketServer({ port: WS_PORT });

wsServer.on('connection', onConnect);
