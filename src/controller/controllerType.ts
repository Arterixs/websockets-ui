import { ClientReqData, Socket } from '../types/types/common.js';
import { regType } from '../handlers/reqType.js';
import { RegObject } from '../types/interface/reg.js';
import { RoomObject } from '../types/interface/room.js';
import { roomType } from '../handlers/roomType.js';
import { AddUserToRoomClient } from '../types/interface/addUser.js';
import { addGame } from '../handlers/startGame.js';
import { AddShips } from '../types/interface/addShips.js';
import { addShips } from '../handlers/addShips.js';

export const controllerType = {
  reg: (object: ClientReqData, socket: Socket) => regType(object as RegObject, socket),
  create_room: (object: ClientReqData, socket: Socket) => roomType(object as RoomObject, socket),
  add_user_to_room: (object: ClientReqData, socket: Socket) => addGame(object as AddUserToRoomClient, socket),
  add_ships: (object: ClientReqData, socket: Socket) => addShips(object as AddShips, socket),
};
