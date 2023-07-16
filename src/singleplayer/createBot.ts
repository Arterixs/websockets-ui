import { gameRoomsBase, roomsBase } from '../store/index.js';
import { dataBotPosition } from './dataDefaultPlayer.js';
import { NewShips } from '../types/types/common.js';

export const createBot = () => {
  const randomPos = Math.floor(Math.random() * dataBotPosition.length);
  const dataBot = dataBotPosition.at(randomPos)!.map((el) => ({ ...el, hitpoint: el.length }));
  const idRoom = roomsBase.getNewRoomId();
  roomsBase.generateIdRoom();
  const objectTroops = { gameId: idRoom, indexPlayer: 0, ships: dataBot };
  gameRoomsBase.setDataGame(idRoom, objectTroops as NewShips);
  return idRoom;
};
