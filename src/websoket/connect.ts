import { Socket } from '../types/types/common.js';
import { convertToJson } from '../helpers/convertToJson.js';
import { controllerType } from '../controller/controllerType.js';
import { defineTypeJson } from '../helpers/defineTypeJson.js';
import { userBase } from '../store/userController.js';

export const onConnect = (socket: Socket) => {
  socket.on('message', (message: Buffer) => {
    try {
      const newMessage = convertToJson(message);
      const objectData = defineTypeJson(newMessage);
      controllerType[objectData.type](objectData, socket);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on('close', () => {
    userBase.deleteUser(socket);
    console.log('Пользователь отключился');
  });
};
