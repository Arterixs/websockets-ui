import { PositionShipsObject } from '../types/interface/position.js';

export const updateDataShips = (dataShips: PositionShipsObject) => {
  const { ships } = dataShips;
  const newShips = ships.map((ship) => {
    const hitpoint = ship.length;
    return { ...ship, hitpoint };
  });
  return { ...dataShips, ships: newShips };
};
