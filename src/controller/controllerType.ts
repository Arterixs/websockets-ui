import { Socket } from '../types/types/websoket.js';
import { regType } from '../handlers/reqType.js';
import { RegObject } from '../types/interface/reg.js';
import { RoomObject } from '../types/interface/room.js';
import { roomType } from '../handlers/roomType.js';

export const controllerType = {
  reg: (object: RegObject | RoomObject, socket: Socket) => regType(object as RegObject, socket),
  create_room: (object: RegObject | RoomObject, socket: Socket) => roomType(object as RoomObject, socket),
};
