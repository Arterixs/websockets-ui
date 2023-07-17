import { Position } from '../types/interface/addShips.js';

export const getBodyShip = (direction: boolean, x: number, y: number, length: number) => {
  const bodyShip: Position[] = [];
  for (let i = 0; i < length; i += 1) {
    if (direction) {
      bodyShip.push({ x, y: y + i });
    } else {
      bodyShip.push({ x: x + i, y });
    }
  }
  return bodyShip;
};
