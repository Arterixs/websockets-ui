import { SinglePlayObj } from 'src/types/interface/singleplayer.js';
import { NewShips, Socket } from '../types/types/common.js';
import { dataBotPosition } from './dataDefaultPlayer.js';
import { getResponseObject } from '../helpers/createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';
import { userBase } from '../store/userController.js';
import { gameRoomsBase, roomsBase } from '../store/index.js';

export const createBot = () => {
  const randomPos = Math.floor(Math.random() * dataBotPosition.length);
  const dataBot = dataBotPosition.at(randomPos)!.map((el) => ({ ...el, hitpoint: el.length }));
  const idRoom = roomsBase.getNewRoomId();
  roomsBase.generateIdRoom();
  const objectTroops = { gameId: idRoom, indexPlayer: 0, ships: dataBot };
  gameRoomsBase.setDataGame(idRoom, objectTroops as NewShips);
  return idRoom;
};

export const single = (_object: SinglePlayObj, socket: Socket) => {
  const userInfo = userBase.getUser(socket);
  const { index } = userInfo!.data;
  const idGameRoom = createBot();
  socket.send(getResponseObject(TypeData.CREATE_GAME, JSON.stringify({ idGame: idGameRoom, idPlayer: index })));
};
