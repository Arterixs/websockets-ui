import { PositionShipsObject } from '../types/interface/position.js';
import { AddShips } from '../types/interface/addShips.js';
import { Socket } from '../types/types/common.js';
import { dataBase } from '../data_base/data_base.js';

export const addShips = (object: AddShips, _socket: Socket) => {
  const { data } = object;
  const objectData = JSON.parse(data) as PositionShipsObject;
  dataBase.setDataGame(objectData.indexPlayer, objectData.ships);
  const amountPlayersReady = dataBase.getSizePlayers();
  if (amountPlayersReady === 2) {
    const arrayData = dataBase.getDataGames();
    // eslint-disable-next-line no-restricted-syntax
    for (const troop of arrayData) {
      const index = troop.at(0);
      const ship = troop.at(1);
      if (typeof index === 'number') {
        const socketUser = dataBase.getSocketUsers(index);
        socketUser?.send(
          JSON.stringify({
            type: 'start_game',
            data: JSON.stringify({ ships: ship, currentPlayerIndex: index }),
            id: 0,
          })
        );
        socketUser?.send(
          JSON.stringify({ type: 'turn', data: JSON.stringify({ currentPlayer: objectData.indexPlayer }), id: 0 })
        );
      }
    }
  }
};
