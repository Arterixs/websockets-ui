import { AttackClient, AttackData } from '../types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { checkMovePlayer, checkShootPlace, getDataPlaceShoot } from '../helpers/supportAttack.js';
import { shoot } from '../helpers/shoot.js';
import { gameRoomsBase } from '../store/index.js';

export const attackShips = (object: AttackClient, socket: Socket) => {
  const dataAttack = JSON.parse(object.data) as AttackData;
  const { x, y, gameId, indexPlayer } = dataAttack;
  const isMovePlayer = checkMovePlayer(gameId, indexPlayer);
  if (!isMovePlayer) return;
  const dataGame = gameRoomsBase.getRoomGame(gameId)?.players;
  if (dataGame) {
    const { dataEnemy } = getDataPlaceShoot(dataGame, indexPlayer);
    const placeShoot = dataEnemy.gameMap[y]![x]!;
    const isCheckPlaceShoot = checkShootPlace(placeShoot);
    if (!isCheckPlaceShoot) return;
    shoot(socket, dataAttack, dataGame, placeShoot);
  }
};
