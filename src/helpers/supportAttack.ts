import { gameRoomsBase } from '../store/index.js';
import { ShipObjectMap } from '../types/interface/addShips.js';
import { ShipStorage, UpgradeShips } from '../types/types/index.js';

export const checkMovePlayer = (gameId: number, indexMovedPlayer: number) => {
  const currentUser = gameRoomsBase.getPlayerMove(gameId);
  if (currentUser === indexMovedPlayer) {
    return true;
  }
  return false;
};

export const checkShootPlace = (placeShoot: ShipObjectMap) => {
  if (placeShoot.shoot) {
    return false;
  }
  return true;
};

export const defineHitpointShip = (ships: UpgradeShips[], x: number, y: number) => {
  const ship = ships.find((boat) => boat.position.x === x && boat.position.y === y);
  if (!ship) throw Error();
  ship.hitpoint -= 1;
  if (ship.hitpoint) {
    return true;
  }
  return false;
};

export const getDataPlaceShoot = (dataGame: ShipStorage[], indexPlayer: number) => {
  const dataEnemyIndex = dataGame.findIndex((item) => item.indexPlayer !== indexPlayer);
  const dataEnemy = dataGame[dataEnemyIndex]!;
  return { dataEnemyIndex, dataEnemy };
};
