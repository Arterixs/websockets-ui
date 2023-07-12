import { TypeData } from '../types/enum/typeData.js';
import { dataBase } from '../data_base/data_base.js';
import { AttackClient, AttackData } from '../types/interface/attack.js';
import { Socket, UpgradeShips } from '../types/types/common.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { getResultDataObject, getResponseObject } from '../helpers/createrObjects.js';
import { hitInShip } from '../helpers/hitShip.js';
import { ShipObjectMap } from '../types/interface/addShips.js';

const checkMovePlayer = (gameId: number, indexMovedPlayer: number) => {
  const currentUser = dataBase.getPlayerMove(gameId);
  if (currentUser === indexMovedPlayer) {
    return true;
  }
  return false;
};

const checkShootPlace = (placeShoot: ShipObjectMap) => {
  if (placeShoot.shoot) {
    return false;
  }
  return true;
};

const defineHitpointShip = (ships: UpgradeShips[], x: number, y: number) => {
  const ship = ships.find((boat) => boat.position.x === x && boat.position.y === y);
  if (!ship) throw Error();
  ship.hitpoint -= 1;
  if (ship.hitpoint) {
    return true;
  }
  return false;
};

export const attackShips = (object: AttackClient, socket: Socket) => {
  const dataAttack = JSON.parse(object.data) as AttackData;
  const { x, y, gameId, indexPlayer } = dataAttack;

  const isMovePlayer = checkMovePlayer(gameId, indexPlayer);
  if (!isMovePlayer) return;

  const dataGame = dataBase.getRoomGame(gameId)?.players;

  if (dataGame) {
    const dataEnemyIndex = dataGame.findIndex((item) => item.indexPlayer !== indexPlayer);
    const dataEnemy = dataGame[dataEnemyIndex];
    const { gameMap, ships } = dataEnemy!;
    const placeShoot = gameMap[y]![x]!;

    const isCheckPlaceShoot = checkShootPlace(placeShoot);
    if (!isCheckPlaceShoot) return;

    const enemySocket = dataBase.getSocketUsers(dataEnemy!.indexPlayer);
    const socketsArray = [socket, enemySocket!];
    placeShoot.shoot = true;

    if (placeShoot.type === 'ship') {
      const hitpontShip = defineHitpointShip(ships, placeShoot.positionX, placeShoot.positionY);

      const commonHits = dataEnemy!.commonHits - 1;
      dataGame[dataEnemyIndex]!.commonHits = commonHits;
      hitInShip(dataAttack, hitpontShip, placeShoot, socketsArray, gameMap);
    } else {
      dataBase.changePlayerMove(gameId, dataEnemy!.indexPlayer);
      socketsArray.forEach((webSocket) => {
        webSocket.send(
          getResponseObject(TypeData.ATTACK, getResultDataObject(x, y, indexPlayer, StatusResultOfAttacks.MISS))
        );
        webSocket.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: dataEnemy!.indexPlayer })));
      });
    }
  }
};
