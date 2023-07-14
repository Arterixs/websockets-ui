import { Socket } from '../types/types/common.js';
import { DataReg, RegObject } from '../types/interface/reg.js';
import { TypeData } from '../types/enum/typeData.js';
import { getResponseObject } from '../helpers/createrObjects.js';
import { roomsBase, userBase, winnersBase } from '../store/index.js';
import { designUserInDataBase } from '../helpers/designUserInDataBase.js';

export const registration = (user: RegObject, socket: Socket) => {
  const { password, name } = JSON.parse(user.data) as DataReg;
  const isUserInBase = userBase.checkUserInStorage(name);
  const userData = designUserInDataBase(socket, isUserInBase, name, password);

  if (userData) {
    userBase.setUser(socket, userData);
    const actualRoom = roomsBase.getActualStringRoom();
    const winners = winnersBase.getWinnersString();
    socket.send(getResponseObject(TypeData.REG, JSON.stringify(userData.data)));
    socket.send(getResponseObject(TypeData.UPDATE_ROOM, actualRoom));
    socket.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
  }
};
