import { PositionShipsObject } from '../types/interface/position.js';
import { AddShips } from '../types/interface/addShips.js';
import { Socket } from '../types/types/common.js';
import { dataBase } from '../data_base/data_base.js';

const MAX_AMOUNT_PLAYERS_IN_ROOM = 2;

export const addShips = (object: AddShips, _socket: Socket) => {
  const objectData = JSON.parse(object.data) as PositionShipsObject;
  dataBase.setDataGame(objectData.gameId, objectData);
  const amountPlayersReady = dataBase.getSizePlayers();
  if (amountPlayersReady === MAX_AMOUNT_PLAYERS_IN_ROOM) {
    const arrayRoom = dataBase.getRoomGame(objectData.gameId);
    if (arrayRoom) {
      arrayRoom.forEach((item) => {
        const { indexPlayer, ships } = item;
        const socketUser = dataBase.getSocketUsers(indexPlayer);
        socketUser?.send(
          JSON.stringify({
            type: 'start_game',
            data: JSON.stringify({ ships, currentPlayerIndex: indexPlayer }),
            id: 0,
          })
        );
        socketUser?.send(
          JSON.stringify({ type: 'turn', data: JSON.stringify({ currentPlayer: objectData.indexPlayer }), id: 0 })
        );
      });
    }
  }
};
