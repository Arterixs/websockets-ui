import { ClientReqData, Socket } from '../types/types/common.js';
import { registration } from '../handlers/registration.js';
import { RegObject } from '../types/interface/reg.js';
import { RoomObject } from '../types/interface/room.js';
import { createRoom } from '../handlers/createRoom.js';
import { AddUserToRoomClient } from '../types/interface/addUser.js';
import { startGame } from '../handlers/startGame.js';
import { AddShips } from '../types/interface/addShips.js';
import { addShips } from '../handlers/addShips.js';
import { AttackClient } from '../types/interface/attack.js';
import { attackShips } from '../handlers/attackShips.js';
import { RandomAttackClient } from '../types/interface/randomAttack.js';
import { randomAttack } from '../handlers/randomAttack.js';

export const controllerType = {
  reg: (object: ClientReqData, socket: Socket) => registration(object as RegObject, socket),
  create_room: (object: ClientReqData, socket: Socket) => createRoom(object as RoomObject, socket),
  add_user_to_room: (object: ClientReqData, socket: Socket) => startGame(object as AddUserToRoomClient, socket),
  add_ships: (object: ClientReqData, socket: Socket) => addShips(object as AddShips, socket),
  attack: (object: ClientReqData, socket: Socket) => attackShips(object as AttackClient, socket),
  randomAttack: (object: ClientReqData, socket: Socket) => randomAttack(object as RandomAttackClient, socket),
};
