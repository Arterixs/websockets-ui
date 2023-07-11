import { Position, ShipObjectMap } from 'src/types/interface/addShips.js';

export const getCoordsAroundShip = (dataEnemy: ShipObjectMap[][], bodyShip: Position[]) => {
  const aroundShip: ShipObjectMap[] = [];
  bodyShip.forEach((item) => {
    const upCenter = dataEnemy[item.y - 1]?.[item.x];
    const upLeft = dataEnemy[item.y - 1]?.[item.x - 1];
    const upRight = dataEnemy[item.y - 1]?.[item.x + 1];
    const middleLeft = dataEnemy[item.y]?.[item.x - 1];
    const middleRight = dataEnemy[item.y]?.[item.x + 1];
    const bottomLeft = dataEnemy[item.y + 1]?.[item.x - 1];
    const bottomRight = dataEnemy[item.y + 1]?.[item.x + 1];
    const bottomCenter = dataEnemy[item.y + 1]?.[item.x];
    const arrDataCell = [upCenter, upLeft, upRight, middleLeft, middleRight, bottomLeft, bottomRight, bottomCenter];
    const updateArr = arrDataCell.filter((cell): cell is ShipObjectMap => cell?.type === 'empty');
    aroundShip.push(...updateArr);
  });
  return aroundShip;
};
