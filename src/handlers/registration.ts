import { Socket } from '../types/types/common.js';
import { RegObject } from '../types/interface/reg.js';
import { TypeData } from '../types/enum/typeData.js';
import { getResponseObject } from '../helpers/createrObjects.js';
import { roomsBase, userBase, winnersBase } from '../store/index.js';
import { updateRegObject } from '../helpers/updataRegObjects.js';

export const registration = (user: RegObject, socket: Socket) => {
  const idUser = userBase.getIdUser();
  const fullUser = updateRegObject(user, socket, idUser);
  userBase.setUser(socket, fullUser);
  const userReg = userBase.getUser(socket);
  const actualRoom = roomsBase.getActualStringRoom();
  const winners = winnersBase.getWinnersString();
  socket.send(getResponseObject(TypeData.REG, JSON.stringify(userReg?.data)));
  socket.send(getResponseObject(TypeData.UPDATE_ROOM, actualRoom));
  socket.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
};
