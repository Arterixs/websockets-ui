import { PositionShipsObject } from '../types/interface/position.js';
import { AddShips } from '../types/interface/addShips.js';
import { Socket } from '../types/types/common.js';
import { TypeData } from '../types/enum/typeData.js';
import { socketBase, gameRoomsBase } from '../store/index.js';
import { updateDataShips } from '../helpers/updateDataShips.js';
import { getResponseObject } from '../helpers/createrObjects.js';

const MAX_AMOUNT_PLAYERS_IN_ROOM = 2;

export const addShips = (object: AddShips, _socket: Socket) => {
  const objectData = JSON.parse(object.data) as PositionShipsObject;
  const upgradeShips = updateDataShips(objectData);
  gameRoomsBase.setDataGame(objectData.gameId, upgradeShips);
  const amountPlayersReady = gameRoomsBase.getSizePlayers(objectData.gameId);
  if (amountPlayersReady === MAX_AMOUNT_PLAYERS_IN_ROOM) {
    const arrayRoom = gameRoomsBase.getRoomGame(objectData.gameId)?.players;
    if (arrayRoom) {
      arrayRoom.forEach((item) => {
        const { indexPlayer, ships } = item;
        const socketUser = socketBase.getSocketUser(indexPlayer);
        socketUser?.send(
          getResponseObject(TypeData.START_GAME, JSON.stringify({ ships, currentPlayerIndex: indexPlayer }))
        );
        socketUser?.send(getResponseObject(TypeData.TURN, JSON.stringify({ currentPlayer: objectData.indexPlayer })));
      });
    }
  }
};
