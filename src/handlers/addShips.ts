import { AddShips } from '../types/interface/addShips.js';
import { Socket } from '../types/types/common.js';

export const addShips = (object: AddShips, _socket: Socket) => {
  const { data } = object;
  const objectData = JSON.parse(data) as unknown;
  console.log(objectData);
};
