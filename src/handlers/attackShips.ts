import { TypeData } from '../types/enum/typeData.js';
import { dataBase } from '../data_base/data_base.js';
import { AttackClient, AttackData } from '../types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { Position, ShipObjectMap } from '../types/interface/addShips.js';

const getBodyShip = (direction: boolean, x: number, y: number, length: number) => {
  const bodyShip = [];
  for (let i = 0; i < length; i += 1) {
    if (direction) {
      bodyShip.push({ x, y: y + i });
    } else {
      bodyShip.push({ x: x + i, y });
    }
  }
  return bodyShip;
};

const findCoordsMiss = (dataEnemy: ShipObjectMap[][], bodyShip: Position[]) => {
  const aroundShip = [] as ShipObjectMap[];
  bodyShip.forEach((item) => {
    const upCenter = dataEnemy[item.y - 1]?.[item.x];
    const upLeft = dataEnemy[item.y - 1]?.[item.x - 1];
    const upRight = dataEnemy[item.y - 1]?.[item.x + 1];
    const middleLeft = dataEnemy[item.y]?.[item.x - 1];
    const middleRight = dataEnemy[item.y]?.[item.x + 1];
    const bottomLeft = dataEnemy[item.y + 1]?.[item.x - 1];
    const bottomRight = dataEnemy[item.y + 1]?.[item.x + 1];
    const bottomCenter = dataEnemy[item.y + 1]?.[item.x];
    const arrDataCell = [
      upCenter!,
      upLeft!,
      upRight!,
      middleLeft!,
      middleRight!,
      bottomLeft!,
      bottomRight!,
      bottomCenter!,
    ];
    const updateArr = arrDataCell.filter((cell) => cell?.type === 'empty');
    aroundShip.push(...updateArr);
  });
  return aroundShip;
};

export const attackShips = (object: AttackClient, socket: Socket) => {
  const dataAttack = JSON.parse(object.data) as AttackData;
  const { x, y, gameId, indexPlayer } = dataAttack;
  const dataGame = dataBase.getRoomGame(gameId);
  if (dataGame) {
    const dataEnemyIndex = dataGame.findIndex((item) => item.indexPlayer !== indexPlayer);
    const dataEnemy = dataGame[dataEnemyIndex];
    const enemySocket = dataBase.getSocketUsers(dataEnemy!.indexPlayer);
    const { gameMap } = dataEnemy!;
    const socketsArray = [socket, enemySocket!];
    const placeShoot = gameMap[y]![x]!;
    const { type, hitpoint, direction, length, positionX, positionY } = placeShoot;
    if (type === 'ship') {
      const hitShip = hitpoint - 1;
      const commonHits = dataEnemy!.commonHits - 1;
      dataGame[dataEnemyIndex]!.commonHits = commonHits;
      dataGame[dataEnemyIndex]!.gameMap[y]![x]!.hitpoint = hitShip;

      dataBase.updateRoomGame(gameId, dataGame);
      if (hitShip) {
        socketsArray.forEach((item) => {
          item.send(
            JSON.stringify({
              type: TypeData.ATTACK,
              id: 0,
              data: JSON.stringify({ position: { x, y }, currentPlayer: indexPlayer, status: 'shot' }),
            })
          );
          item.send(JSON.stringify({ type: 'turn', data: JSON.stringify({ currentPlayer: indexPlayer }), id: 0 }));
        });
      } else {
        const bodyShip = getBodyShip(direction, positionX, positionY, length);
        const aroundShipPlace = findCoordsMiss(gameMap, bodyShip);
        bodyShip.forEach((item) => {
          socketsArray[0]?.send(
            JSON.stringify({
              type: TypeData.ATTACK,
              id: 0,
              data: JSON.stringify({
                position: { x: item.x, y: item.y },
                currentPlayer: indexPlayer,
                status: 'killed',
              }),
            })
          );
          socketsArray[1]?.send(
            JSON.stringify({
              type: TypeData.ATTACK,
              id: 0,
              data: JSON.stringify({
                position: { x: item.x, y: item.y },
                currentPlayer: indexPlayer,
                status: 'killed',
              }),
            })
          );
        });
        aroundShipPlace.forEach((item) => {
          socketsArray[0]?.send(
            JSON.stringify({
              type: TypeData.ATTACK,
              id: 0,
              data: JSON.stringify({
                position: { x: item.positionX, y: item.positionY },
                currentPlayer: indexPlayer,
                status: 'miss',
              }),
            })
          );
          socketsArray[1]?.send(
            JSON.stringify({
              type: TypeData.ATTACK,
              id: 0,
              data: JSON.stringify({
                position: { x: item.positionX, y: item.positionY },
                currentPlayer: indexPlayer,
                status: 'miss',
              }),
            })
          );
        });
        socketsArray[0]?.send(
          JSON.stringify({ type: 'turn', data: JSON.stringify({ currentPlayer: indexPlayer }), id: 0 })
        );
        socketsArray[1]?.send(
          JSON.stringify({ type: 'turn', data: JSON.stringify({ currentPlayer: indexPlayer }), id: 0 })
        );
      }
    } else {
      socketsArray.forEach((item) => {
        item.send(
          JSON.stringify({
            type: TypeData.ATTACK,
            id: 0,
            data: JSON.stringify({ position: { x, y }, currentPlayer: indexPlayer, status: 'miss' }),
          })
        );
        item.send(
          JSON.stringify({ type: 'turn', data: JSON.stringify({ currentPlayer: dataEnemy!.indexPlayer }), id: 0 })
        );
      });
    }
  }
};
