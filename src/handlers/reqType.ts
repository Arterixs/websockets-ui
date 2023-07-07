import { Socket } from '../types/types/websoket.js';
import { dataBase } from '../data_base/data_base.js';
import { DataReg, RegObject, UpdateUser } from '../types/interface/reg.js';

const updateDataPropertyUser = (data: string) => {
  const { password, name } = JSON.parse(data) as DataReg;
  const isValid = password.length < 5 && name.length < 5;
  return { password, name, error: isValid, errorText: 'Minimum 5 characters', index: 0 };
};

const updateObject = (obj: RegObject) => {
  const user = JSON.parse(JSON.stringify(obj)) as UpdateUser;
  const data = updateDataPropertyUser(obj.data);
  user.data = data;
  return user;
};

export const regType = (user: RegObject, socket: Socket) => {
  const fullUser = updateObject(user);
  const readyUser = dataBase.setData(socket, fullUser);
  socket.send(JSON.stringify(readyUser));
};
