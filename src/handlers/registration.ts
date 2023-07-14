import { Socket } from '../types/types/common.js';
import { DataReg, RegObject } from '../types/interface/reg.js';
import { TypeData } from '../types/enum/typeData.js';
import { createRegObject, getResponseObject } from '../helpers/createrObjects.js';
import { roomsBase, userBase, winnersBase } from '../store/index.js';
import { checkUserRegValidation, checkValidationPassword } from '../helpers/validationUser.js';

export const registration = (user: RegObject, socket: Socket) => {
  const { password, name } = JSON.parse(user.data) as DataReg;
  const isUserInBase = userBase.checkUserInStorage(name);
  let userData = null;

  if (isUserInBase) {
    const fullUserObject = checkUserRegValidation(name, password);
    if (fullUserObject.error) {
      socket.send(getResponseObject(TypeData.REG, JSON.stringify(fullUserObject)));
      return;
    }
    userData = createRegObject(socket, fullUserObject);
    userBase.changeStatusUser(name, true);
  } else {
    const idUser = userBase.getIdUser();
    const userValid = checkValidationPassword(name, password, idUser);
    if (userValid.error) {
      socket.send(getResponseObject(TypeData.REG, JSON.stringify(userValid)));
      return;
    }
    userData = createRegObject(socket, userValid);
    userBase.setUserStorage(userValid);
  }

  userBase.setUser(socket, userData);
  const actualRoom = roomsBase.getActualStringRoom();
  const winners = winnersBase.getWinnersString();
  socket.send(getResponseObject(TypeData.REG, JSON.stringify(userData.data)));
  socket.send(getResponseObject(TypeData.UPDATE_ROOM, actualRoom));
  socket.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
};
