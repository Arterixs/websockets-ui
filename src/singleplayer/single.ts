import { SinglePlayObj } from 'src/types/interface/singleplayer.js';
import { Socket } from '../types/types/common.js';
import { getResponseObject } from '../helpers/createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';
import { userBase } from '../store/userController.js';
import { createBot } from './createBot.js';

export const single = (_object: SinglePlayObj, socket: Socket) => {
  const userInfo = userBase.getUser(socket);
  const { index, name } = userInfo!.data;
  const idGameRoom = createBot();
  userBase.changeSinglePlay(name, true);
  socket.send(getResponseObject(TypeData.CREATE_GAME, JSON.stringify({ idGame: idGameRoom, idPlayer: index })));
};
