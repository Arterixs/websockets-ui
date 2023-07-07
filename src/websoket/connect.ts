import { Socket } from '../types/types/websoket.js';
import { convertToJson } from '../helpers/convertToJson.js';
import { controllerType } from '../controller/controllerType.js';
import { defineTypeJson } from '../helpers/defineTypeJson.js';

export const onConnect = (socket: Socket) => {
  try {
    socket.on('message', (message: Buffer) => {
      const newMessage = convertToJson(message);
      const objectData = defineTypeJson(newMessage);
      controllerType[objectData.type](objectData, socket);
    });
    socket.on('close', () => {
      console.log('Пользователь отключился');
    });
  } catch (err) {
    console.log(err);
  }
};