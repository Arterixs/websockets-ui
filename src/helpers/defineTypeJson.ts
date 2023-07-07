import { TypeData } from '../types/enum/typeData.js';
import { RegObject } from '../types/interface/reg.js';
import { RoomObject } from '../types/interface/room.js';
import { UnknownData } from '../types/interface/unknownData.js';

export const defineTypeJson = (data: unknown) => {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    if (
      Object.prototype.hasOwnProperty.call(data, 'type') &&
      Object.prototype.hasOwnProperty.call(data, 'data') &&
      Object.prototype.hasOwnProperty.call(data, 'id')
    ) {
      const unknownData = data as UnknownData;
      if (unknownData.type === TypeData.REG) {
        const regObj = unknownData as RegObject;
        return regObj;
      }
      if (unknownData.type === TypeData.CREATE_ROOM) {
        const roomObject = unknownData as RoomObject;
        return roomObject;
      }
    }
    throw new Error();
  }
  throw new Error();
};
