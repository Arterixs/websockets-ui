import { PositionShipsObject } from '../types/interface/position.js';
import { AddShips } from '../types/interface/addShips.js';
import { Socket } from '../types/types/common.js';
import { TypeData } from '../types/enum/typeData.js';
import { gameRoomsBase } from '../store/gameRoomsController.js';
import { socketBase } from '../store/socketController.js';

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
  gameRoomsBase.setDataGame(objectData.gameId, upgradeShips);
  const amountPlayersReady = gameRoomsBase.getSizePlayers(objectData.gameId);
  if (amountPlayersReady === MAX_AMOUNT_PLAYERS_IN_ROOM) {
    const arrayRoom = gameRoomsBase.getRoomGame(objectData.gameId)?.players;
    if (arrayRoom) {
      arrayRoom.forEach((item) => {
        const { indexPlayer, ships } = item;
        const socketUser = socketBase.getSocketUser(indexPlayer);
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
