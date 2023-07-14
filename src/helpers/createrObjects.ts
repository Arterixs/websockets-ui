import { Socket } from '../types/types/common.js';
import { TypeData } from '../types/enum/typeData.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { DataBase } from '../types/interface/reg.js';

export const getResultDataObject = (x: number, y: number, currentPlayer: number, status: StatusResultOfAttacks) => {
  const data = {
    position: {
      x,
      y,
    },
    currentPlayer,
    status,
  };
  return JSON.stringify(data);
};

export const getResponseObject = (type: TypeData, data: string | Record<string, unknown>) => {
  const object = {
    type,
    data,
    id: 0,
  };
  return JSON.stringify(object);
};

export const createObjectGame = (gameId: number, x: number, y: number, indexPlayer: number) => {
  const object = {
    gameId,
    x,
    y,
    indexPlayer,
  };
  return object;
};

export const createRoomObject = (roomId: number, name: string, index: number) => {
  const arrRoom = {
    roomId,
    idOwnerRoom: index,
    roomUsers: [
      {
        name,
        index,
      },
    ],
  };
  return arrRoom;
};

export const createRegObject = (socket: Socket, obj: DataBase) => {
  const newObj = {
    type: TypeData.REG,
    data: obj,
    socket,
    id: 0,
  };
  return newObj;
};
