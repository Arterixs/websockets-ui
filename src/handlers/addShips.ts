import { PositionShipsObject } from '../types/interface/position.js';
import { AddShips } from '../types/interface/addShips.js';
import { Socket } from '../types/types/common.js';
import { dataBase } from '../data_base/data_base.js';
import { TypeData } from '../types/enum/typeData.js';

const MAX_AMOUNT_PLAYERS_IN_ROOM = 2;

export const updateShips = (dataShips: PositionShipsObject) => {
  const { ships } = dataShips;
  const newShips = ships.map((item) => {
    const hitpoint = item.length;
    return { ...item, hitpoint };
  });
  return { ...dataShips, ships: newShips };
};

export const addShips = (object: AddShips, _socket: Socket) => {
  const objectData = JSON.parse(object.data) as PositionShipsObject;
  const upgradeShips = updateShips(objectData);
  dataBase.setDataGame(objectData.gameId, upgradeShips);
  const amountPlayersReady = dataBase.getSizePlayers(objectData.gameId);
  if (amountPlayersReady === MAX_AMOUNT_PLAYERS_IN_ROOM) {
    const arrayRoom = dataBase.getRoomGame(objectData.gameId);
    if (arrayRoom) {
      arrayRoom.forEach((item) => {
        const { indexPlayer, ships } = item;
        const socketUser = dataBase.getSocketUsers(indexPlayer);
        socketUser?.send(
          JSON.stringify({
            type: TypeData.START_GAME,
            data: JSON.stringify({ ships, currentPlayerIndex: indexPlayer }),
            id: 0,
          })
        );
        socketUser?.send(
          JSON.stringify({
            type: TypeData.TURN,
            data: JSON.stringify({ currentPlayer: objectData.indexPlayer }),
            id: 0,
          })
        );
      });
    }
  }
};
