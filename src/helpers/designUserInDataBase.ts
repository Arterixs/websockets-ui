import { Socket } from '../types/types/common.js';
import { checkUserRegValidation, checkValidationPasswordOrName } from './validationUser.js';
import { createRegObject, getResponseObject } from './createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';
import { userBase } from '../store/index.js';

export const designUserInDataBase = (socket: Socket, isUserInBase: boolean, name: string, password: string) => {
  if (isUserInBase) {
    const fullUserObject = checkUserRegValidation(name, password);
    if (fullUserObject.error) {
      socket.send(getResponseObject(TypeData.REG, JSON.stringify(fullUserObject)));
      return null;
    }
    userBase.changeStatusUser(name, true);
    return createRegObject(socket, fullUserObject);
  }

  const idUser = userBase.getIdUser();
  const userValid = checkValidationPasswordOrName(name, password, idUser);
  if (userValid.error) {
    socket.send(getResponseObject(TypeData.REG, JSON.stringify(userValid)));
    return null;
  }
  userBase.setUserStorage(userValid);
  return createRegObject(socket, userValid);
};
