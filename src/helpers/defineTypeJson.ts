import {
  isAddUserObject,
  isAttackObject,
  isRandomAttackObject,
  isRegObject,
  isRoomObject,
  isShipsObject,
} from '../types/typeGuards.js';

export const defineTypeJson = (data: unknown) => {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    if (isRegObject(data)) {
      return data;
    }
    if (isRoomObject(data)) {
      return data;
    }
    if (isAddUserObject(data)) {
      return data;
    }
    if (isShipsObject(data)) {
      return data;
    }
    if (isAttackObject(data)) {
      return data;
    }
    if (isRandomAttackObject(data)) {
      return data;
    }
    throw new Error();
  }
  throw new Error();
};
