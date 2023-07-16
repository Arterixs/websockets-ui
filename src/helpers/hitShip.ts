import { TypeData } from '../types/enum/typeData.js';
import { StatusResultOfAttacks } from '../types/enum/typeResultAttack.js';
import { ShipObjectMap } from '../types/interface/addShips.js';
import { AttackData } from '../types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { getResultDataObject, getResponseObject } from './createrObjects.js';
import { getBodyShip } from './getBodyShip.js';
import { getCoordsAroundShip } from './getCoordsAroundShip.js';
import { gameRoomsBase } from '../store/index.js';
import { finishGame } from './finishGame.js';
import { RandomAttackClient } from '../types/interface/randomAttack.js';
import { randomAttack } from '../handlers/randomAttack.js';
import { shootBot } from '../singleplayer/shootBot.js';

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
  gameRoomsBase.changePlayerMove(gameId, indexPlayer);

  if (hitpontShip) {
    socketsArray.forEach((webSocket) => {
      webSocket.send(
        getResponseObject(TypeData.ATTACK, getResultDataObject(x, y, indexPlayer, StatusResultOfAttacks.SHOT))
      );
      webSocket.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: indexPlayer })));
    });
    if (indexPlayer === 0) {
      shootBot(gameId);
    }
  } else {
    const bodyShip = getBodyShip(direction, positionX, positionY, length);
    const placesAroundShip = getCoordsAroundShip(gameMap, bodyShip);

    bodyShip.forEach((boat) => {
      socketsArray[0]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(boat.x, boat.y, indexPlayer, StatusResultOfAttacks.KILLED)
        )
      );
      socketsArray[1]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(boat.x, boat.y, indexPlayer, StatusResultOfAttacks.KILLED)
        )
      );
    });
    placesAroundShip.forEach((place) => {
      place.shoot = true;
      socketsArray[0]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(place.positionX, place.positionY, indexPlayer, StatusResultOfAttacks.MISS)
        )
      );
      socketsArray[1]?.send(
        getResponseObject(
          TypeData.ATTACK,
          getResultDataObject(place.positionX, place.positionY, indexPlayer, StatusResultOfAttacks.MISS)
        )
      );
    });

    if (commonHits) {
      socketsArray[0]?.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: indexPlayer })));
      socketsArray[1]?.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: indexPlayer })));
      if (indexPlayer === 0) {
        shootBot(gameId);
      }
    } else {
      finishGame(socketsArray, indexPlayer, gameId);
    }
  }
};
