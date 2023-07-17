import { ShipObjectMap, DataShips } from '../types/interface/addShips.js';

const ROWS_DEFAULT = 10;
const COLUMN_DEFAULT = 10;

export const createGameField = (ships: DataShips[]) => {
  const gameMap: ShipObjectMap[][] = [];
  for (let i = 0; i < COLUMN_DEFAULT; i += 1) {
    const column = [];
    for (let j = 0; j < ROWS_DEFAULT; j += 1) {
      column.push({
        type: 'empty',
        length: 0,
        direction: false,
        positionX: j,
        positionY: i,
        truePositionX: j,
        truePositionY: i,
        hitpoint: 0,
        shoot: false,
      });
    }
    gameMap.push(column);
  }
  let commonHits = 0;
  ships.forEach((ship) => {
    const { position, direction, length, hitpoint } = ship;
    const { x, y } = position;
    commonHits += hitpoint;
    for (let i = 0; i < length; i += 1) {
      const objectShip = {
        type: 'ship',
        length,
        direction,
        positionX: x,
        positionY: y,
        truePositionX: direction ? x : x + i,
        truePositionY: direction ? y + i : y,
        hitpoint,
        shoot: false,
      };
      if (direction) {
        gameMap[y + i]![x] = objectShip;
      } else {
        gameMap[y]![x + i] = objectShip;
      }
    }
  });
  return { gameMap, commonHits };
};
