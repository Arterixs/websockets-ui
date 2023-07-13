import { TypeData } from '../types/enum/typeData.js';
import { ShipObjectMap } from '../types/interface/addShips.js';
import { AttackData } from '../types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { getResultDataObject, getResponseObject } from './createrObjects.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { getBodyShip } from './getBodyShip.js';
import { getCoordsAroundShip } from './getCoordsAroundShip.js';
import { dataBase } from '../data_base/data_base.js';

export const hitInShip = (
  dataAttack: AttackData,
  hitpontShip: boolean,
  placeShoot: ShipObjectMap,
  socketsArray: Socket[],
  gameMap: ShipObjectMap[][],
  commonHits: number
) => {
  const { direction, length, positionX, positionY } = placeShoot;
  const { x, y, indexPlayer, gameId } = dataAttack;
  dataBase.changePlayerMove(gameId, indexPlayer);

  if (hitpontShip) {
    socketsArray.forEach((webSocket) => {
      webSocket.send(
        getResponseObject(TypeData.ATTACK, getResultDataObject(x, y, indexPlayer, StatusResultOfAttacks.SHOT))
      );
      webSocket.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: indexPlayer })));
    });
  } else {
    const bodyShip = getBodyShip(direction, positionX, positionY, length);
    const placesAroundShip = getCoordsAroundShip(gameMap, bodyShip);

    bodyShip.forEach((item) => {
      socketsArray[0]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(item.x, item.y, indexPlayer, StatusResultOfAttacks.KILLED)
        )
      );
      socketsArray[1]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(item.x, item.y, indexPlayer, StatusResultOfAttacks.KILLED)
        )
      );
    });
    placesAroundShip.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.shoot = true;
      socketsArray[0]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(item.positionX, item.positionY, indexPlayer, StatusResultOfAttacks.MISS)
        )
      );
      socketsArray[1]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(item.positionX, item.positionY, indexPlayer, StatusResultOfAttacks.MISS)
        )
      );
    });
    if (commonHits) {
      socketsArray[0]?.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: indexPlayer })));
      socketsArray[1]?.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: indexPlayer })));
    } else {
      const allUsers = dataBase.getSocketsUsers();
      socketsArray.forEach((webSocket) => {
        webSocket.send(getResponseObject(TypeData.FINISH, JSON.stringify({ winPlayer: indexPlayer })));
      });
      dataBase.deleteGameRoom(gameId);
      const userWin = dataBase.getUser(socketsArray[0]!);
      const name = userWin?.data.name;
      if (name) {
        dataBase.setWinners(name);
      }
      const winners = dataBase.getWinnersString();
      // eslint-disable-next-line no-restricted-syntax
      for (const user of allUsers) {
        user.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
      }
      console.log('finish');
    }
  }
};
