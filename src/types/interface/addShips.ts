import { TypeData } from '../enum/typeData.js';

export interface AddShips {
  type: TypeData.ADD_SHIPS;
  data: string;
  id: number;
}
