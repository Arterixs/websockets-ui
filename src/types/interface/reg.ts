import { TypeData } from '../enum/typeData.js';

export interface RegObject {
  type: TypeData.REG;
  data: string;
  id: number;
}

export interface UpdateUser {
  type: string;
  data: DataBase;
  id: number;
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
