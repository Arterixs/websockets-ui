import { defineHitpointShip, getDataPlaceShoot } from '../handlers/supportAttack.js';
import { ShipObjectMap } from '../types/interface/addShips.js';
import { AttackData } from '../types/interface/attack.js';
import { ShipStorage, Socket } from '../types/types/common.js';
// import { dataBase } from '../data_base/data_base.js';
import { hitInShip } from './hitShip.js';
import { getResultDataObject, getResponseObject } from './createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { gameRoomsBase } from '../store/gameRoomsController.js';
import { socketBase } from '../store/socketController.js';

export const shoot = (socket: Socket, dataAttack: AttackData, dataGame: ShipStorage[], placeShoot: ShipObjectMap) => {
  const { x, y, gameId, indexPlayer } = dataAttack;
  const { dataEnemyIndex, dataEnemy } = getDataPlaceShoot(dataGame, indexPlayer);
  const enemySocket = socketBase.getSocketUser(dataEnemy.indexPlayer);
  const socketsArray = [socket, enemySocket!];
  // eslint-disable-next-line no-param-reassign
  placeShoot.shoot = true;
  if (placeShoot.type === 'ship') {
    const hitpontShip = defineHitpointShip(dataEnemy.ships, placeShoot.positionX, placeShoot.positionY);
    const commonHits = dataEnemy.commonHits - 1;
    // eslint-disable-next-line no-param-reassign
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
