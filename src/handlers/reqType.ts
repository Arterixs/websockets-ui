import { Socket } from '../types/types/common.js';
import { DataReg, RegObject, UpdateUser } from '../types/interface/reg.js';
import { TypeData } from '../types/enum/typeData.js';
import { getResponseObject } from '../helpers/createrObjects.js';
import { roomsBase, userBase, winnersBase } from '../store/index.js';

const updateDataPropertyUser = (data: string, index: number) => {
  const { password, name } = JSON.parse(data) as DataReg;
  const isValid = password.length < 5 && name.length < 5;
  return { password, name, error: isValid, errorText: 'Minimum 5 characters', index };
};

const updateObject = (obj: RegObject, socket: Socket, idUser: number) => {
  const user = JSON.parse(JSON.stringify(obj)) as UpdateUser;
  const data = updateDataPropertyUser(obj.data, idUser);
  user.data = data;
  user.socket = socket;
  return user;
};

export const regType = (user: RegObject, socket: Socket) => {
  const idUser = userBase.getIdUser();
  const fullUser = updateObject(user, socket, idUser);
  userBase.setUser(socket, fullUser);
  const userReg = userBase.getUser(socket);
  const actualRoom = roomsBase.getActualStringRoom();
  const winners = winnersBase.getWinnersString();
  socket.send(JSON.stringify({ type: TypeData.REG, data: JSON.stringify(userReg?.data), id: 0 }));
  socket.send(JSON.stringify({ type: TypeData.UPDATE_ROOM, data: actualRoom, id: 0 }));
  socket.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
};
