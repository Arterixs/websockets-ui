import { AddUserToRoomClient } from '../types/interface/addUser.js';
import { TypeData } from '../types/enum/typeData.js';
import { RegObject } from '../types/interface/reg.js';
import { RoomObject } from '../types/interface/room.js';
import { UnknownData } from '../types/interface/unknownData.js';
import { AddShips } from '../types/interface/addShips.js';
import { AttackClient } from '../types/interface/attack.js';

export const defineTypeJson = (data: unknown) => {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    if (
      Object.prototype.hasOwnProperty.call(data, 'type') &&
      Object.prototype.hasOwnProperty.call(data, 'data') &&
      Object.prototype.hasOwnProperty.call(data, 'id')
    ) {
      const unknownData = data as UnknownData;
      if (unknownData.type === TypeData.REG) {
        return unknownData as RegObject;
      }
      if (unknownData.type === TypeData.CREATE_ROOM) {
        return unknownData as RoomObject;
      }
      if (unknownData.type === TypeData.ADD_USER_ROOM) {
        return unknownData as AddUserToRoomClient;
      }
      if (unknownData.type === TypeData.ADD_SHIPS) {
        return unknownData as AddShips;
      }
      if (unknownData.type === TypeData.ATTACK) {
        return unknownData as AttackClient;
      }
    }
    throw new Error();
  }
  throw new Error();
};
