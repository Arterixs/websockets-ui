import { TypeData } from '../types/enum/typeData.js';
import { dataBase } from '../data_base/data_base.js';
import { AttackClient, AttackData } from '../types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { getCoordsAroundShip } from '../helpers/getCoordsAroundShip.js';
import { getBodyShip } from '../helpers/getBodyShip.js';
import { sendAttackSockets } from '../helpers/sendAttackSockets.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';

export const attackShips = (object: AttackClient, socket: Socket) => {
  const dataAttack = JSON.parse(object.data) as AttackData;
  const { x, y, gameId, indexPlayer } = dataAttack;
  const dataGame = dataBase.getRoomGame(gameId);
  if (dataGame) {
    const dataEnemyIndex = dataGame.findIndex((item) => item.indexPlayer !== indexPlayer);
    const dataEnemy = dataGame[dataEnemyIndex];
    const enemySocket = dataBase.getSocketUsers(dataEnemy!.indexPlayer);
    const { gameMap } = dataEnemy!;
    const socketsArray: Socket[] = [socket, enemySocket!];
    const placeShoot = gameMap[y]![x]!;
    const { type, hitpoint, direction, length, positionX, positionY } = placeShoot;
    if (type === 'ship') {
      const hitShip = hitpoint - 1;
      const commonHits = dataEnemy!.commonHits - 1;
      dataGame[dataEnemyIndex]!.commonHits = commonHits;
      dataGame[dataEnemyIndex]!.gameMap[y]![x]!.hitpoint = hitShip;

      dataBase.updateRoomGame(gameId, dataGame);
      if (hitShip) {
        sendAttackSockets(
          socketsArray,
          { position: { x, y }, currentPlayer: indexPlayer, status: StatusResultOfAttacks.SHOT },
          { currentPlayer: indexPlayer },
          true
        );
      } else {
        const bodyShip = getBodyShip(direction, positionX, positionY, length);
        const aroundShipPlace = getCoordsAroundShip(gameMap, bodyShip);
        bodyShip.forEach((item) => {
          sendAttackSockets(
            socketsArray,
            { position: { x: item.x, y: item.y }, currentPlayer: indexPlayer, status: StatusResultOfAttacks.KILLED },
            { currentPlayer: indexPlayer },
            false
          );
        });
        aroundShipPlace.forEach((item) => {
          sendAttackSockets(
            socketsArray,
            {
              position: { x: item.positionX, y: item.positionY },
              currentPlayer: indexPlayer,
              status: StatusResultOfAttacks.MISS,
            },
            { currentPlayer: indexPlayer },
            false
          );
        });
        socketsArray[0]?.send(
          JSON.stringify({ type: TypeData.TURN, data: JSON.stringify({ currentPlayer: indexPlayer }), id: 0 })
        );
        socketsArray[1]?.send(
          JSON.stringify({ type: TypeData.TURN, data: JSON.stringify({ currentPlayer: indexPlayer }), id: 0 })
        );
      }
    } else {
      sendAttackSockets(
        socketsArray,
        { position: { x, y }, currentPlayer: indexPlayer, status: StatusResultOfAttacks.MISS },
        { currentPlayer: dataEnemy!.indexPlayer },
        true
      );
    }
  }
};
