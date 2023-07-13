import { Socket } from '../types/types/common.js';
import { DataRandAttact, RandomAttackClient } from '../types/interface/randomAttack.js';
import { getDataPlaceShoot } from './supportAttack.js';
import { shoot } from '../helpers/shoot.js';
import { gameRoomsBase } from '../store/index.js';

const randomCoords = (amount: number) => Math.floor(Math.random() * amount);

const createObjectGame = (gameId: number, x: number, y: number, indexPlayer: number) => {
  const object = {
    gameId,
    x,
    y,
    indexPlayer,
  };
  return object;
};

export const randomAttack = (object: RandomAttackClient, socket: Socket) => {
  const data = JSON.parse(object.data) as DataRandAttact;
  const dataGame = gameRoomsBase.getRoomGame(data.gameId)?.players;
  if (dataGame) {
    const { dataEnemy } = getDataPlaceShoot(dataGame, data.indexPlayer);
    const { gameMap } = dataEnemy;
    const placeEmpty = gameMap.map((row) => row.filter((place) => !place.shoot)).flat(1);
    const randomNumber = randomCoords(placeEmpty.length);
    const placeShoot = placeEmpty[randomNumber];
    if (placeShoot) {
      const { truePositionY, truePositionX, positionX, positionY } = placeShoot;
      const choosePlace = gameMap[truePositionY]![truePositionX]!;
      const objectAttack = createObjectGame(data.gameId, positionX, positionY, data.indexPlayer);
      shoot(socket, objectAttack, dataGame, choosePlace);
    }
  }
};
