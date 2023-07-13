import { DataReg, RegObject, UpdateUser } from '../types/interface/reg.js';
import { Socket } from '../types/types/common.js';

const updateDataPropertyUser = (data: string, index: number) => {
  const { password, name } = JSON.parse(data) as DataReg;
  const isValid = password.length < 5 && name.length < 5;
  return { password, name, error: isValid, errorText: 'Minimum 5 characters', index };
};

export const updateRegObject = (obj: RegObject, socket: Socket, idUser: number) => {
  const user = JSON.parse(JSON.stringify(obj)) as UpdateUser;
  const data = updateDataPropertyUser(obj.data, idUser);
  user.data = data;
  user.socket = socket;
  return user;
};
