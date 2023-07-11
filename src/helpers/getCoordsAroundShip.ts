import { Position, ShipObjectMap } from '../types/interface/addShips.js';

export const getCoordsAroundShip = (dataEnemy: ShipObjectMap[][], bodyShip: Position[]) => {
  const aroundShip: ShipObjectMap[] = [];
  bodyShip.forEach((pos) => {
    const upCenter = dataEnemy[pos.y - 1]?.[pos.x];
    const upLeft = dataEnemy[pos.y - 1]?.[pos.x - 1];
    const upRight = dataEnemy[pos.y - 1]?.[pos.x + 1];
    const middleLeft = dataEnemy[pos.y]?.[pos.x - 1];
    const middleRight = dataEnemy[pos.y]?.[pos.x + 1];
    const bottomLeft = dataEnemy[pos.y + 1]?.[pos.x - 1];
    const bottomRight = dataEnemy[pos.y + 1]?.[pos.x + 1];
    const bottomCenter = dataEnemy[pos.y + 1]?.[pos.x];
    const arrDataCell = [upCenter, upLeft, upRight, middleLeft, middleRight, bottomLeft, bottomRight, bottomCenter];
    const updateArr = arrDataCell.filter((cell): cell is ShipObjectMap => cell?.type === 'empty');
    aroundShip.push(...updateArr);
  });
  return aroundShip;
};
