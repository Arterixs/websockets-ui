import { TypeData } from '../enum/typeData.js';
import { Socket } from '../types/common.js';

export interface RegObject {
  type: TypeData.REG;
  data: string;
  id: number;
}

export interface UpdateUser {
  type: string;
  data: DataBase;
  id: number;
  socket: Socket;
}

export interface DataReg {
  name: string;
  password: string;
}

export interface DataBase {
  name: string;
  password: string;
  error: boolean;
  errorText: string;
  index: number;
}
