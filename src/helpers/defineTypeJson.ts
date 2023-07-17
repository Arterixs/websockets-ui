import {
  isAddUserObject,
  isAttackObject,
  isRandomAttackObject,
  isRegObject,
  isRoomObject,
  isShipsObject,
  isSinglePlayObject,
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
    if (isSinglePlayObject(data)) {
      return data;
    }
    throw new Error('Request data is not expected data');
  }
  throw new Error('Request data is not object');
};
