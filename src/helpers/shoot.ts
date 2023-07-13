import { defineHitpointShip, getDataPlaceShoot } from './supportAttack.js';
import { ShipObjectMap } from '../types/interface/addShips.js';
import { AttackData } from '../types/interface/attack.js';
import { ShipStorage, Socket } from '../types/types/common.js';
import { hitInShip } from './hitShip.js';
import { getResultDataObject, getResponseObject } from './createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { gameRoomsBase, socketBase } from '../store/index.js';

export const shoot = (socket: Socket, dataAttack: AttackData, dataGame: ShipStorage[], placeShoot: ShipObjectMap) => {
  const { x, y, gameId, indexPlayer } = dataAttack;
  const { dataEnemyIndex, dataEnemy } = getDataPlaceShoot(dataGame, indexPlayer);
  const enemySocket = socketBase.getSocketUser(dataEnemy.indexPlayer);
  const socketsArray = [socket, enemySocket!];
  placeShoot.shoot = true;
  if (placeShoot.type === 'ship') {
    const hitpontShip = defineHitpointShip(dataEnemy.ships, placeShoot.positionX, placeShoot.positionY);
    const commonHits = dataEnemy.commonHits - 1;
    dataGame[dataEnemyIndex]!.commonHits = commonHits;
    hitInShip(dataAttack, hitpontShip, placeShoot, socketsArray, dataEnemy.gameMap, commonHits);
  } else {
    gameRoomsBase.changePlayerMove(gameId, dataEnemy.indexPlayer);
    socketsArray.forEach((webSocket) => {
      webSocket.send(
        getResponseObject(TypeData.ATTACK, getResultDataObject(x, y, indexPlayer, StatusResultOfAttacks.MISS))
      );
      webSocket.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: dataEnemy.indexPlayer })));
    });
  }
};
