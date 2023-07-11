import { TypeData } from '../types/enum/typeData.js';
import { dataBase } from '../data_base/data_base.js';
import { AttackClient, AttackData } from '../types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { getResultDataObject, getResponseObject } from '../helpers/createrObjects.js';
import { hitInShip } from '../helpers/hitShip.js';

const checkMovePlayer = (socket: Socket, indexMovedPlayer: number) => {
  const currentUser = dataBase.getUser(socket);
  console.log(indexMovedPlayer, currentUser?.data.index);
  if (currentUser?.data.index === indexMovedPlayer) {
    return true;
  }
  return false;
};

export const attackShips = (object: AttackClient, socket: Socket) => {
  const dataAttack = JSON.parse(object.data) as AttackData;
  const { x, y, gameId, indexPlayer } = dataAttack;

  const isMovePlayer = checkMovePlayer(socket, indexPlayer);
  if (!isMovePlayer) return;

  const dataGame = dataBase.getRoomGame(gameId);
  if (dataGame) {
    const dataEnemyIndex = dataGame.findIndex((item) => item.indexPlayer !== indexPlayer);
    const dataEnemy = dataGame[dataEnemyIndex];
    const { gameMap } = dataEnemy!;
    const placeShoot = gameMap[y]![x]!;
    const enemySocket = dataBase.getSocketUsers(dataEnemy!.indexPlayer);
    const socketsArray = [socket, enemySocket!];
    if (placeShoot.type === 'ship') {
      const hitpontShip = placeShoot.hitpoint - 1;
      const commonHits = dataEnemy!.commonHits - 1;
      dataGame[dataEnemyIndex]!.commonHits = commonHits;
      dataGame[dataEnemyIndex]!.gameMap[y]![x]!.hitpoint = hitpontShip;
      dataBase.updateRoomGame(gameId, dataGame);

      hitInShip(dataAttack, hitpontShip, placeShoot, socketsArray, gameMap);
    } else {
      socketsArray.forEach((webSocket) => {
        webSocket.send(
          getResponseObject(TypeData.ATTACK, getResultDataObject(x, y, indexPlayer, StatusResultOfAttacks.MISS))
        );
        webSocket.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: dataEnemy!.indexPlayer })));
      });
    }
  }
};
