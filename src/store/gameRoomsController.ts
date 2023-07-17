import { createGameField } from '../helpers/createGameField.js';
import { NewShips } from '../types/types/index.js';
import { Storage } from './storage.js';

class GameRoomsController {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  public setDataGame(idRoom: number, dataTroops: NewShips) {
    const { gameMap, commonHits } = createGameField(dataTroops.ships);
    const { gameId, indexPlayer, ships } = dataTroops;
    const dataShip = { gameId, indexPlayer, gameMap, commonHits, ships };
    if (this.storage.gameRooms.has(idRoom)) {
      const room = this.storage.gameRooms.get(idRoom)!;
      const { players } = room;
      room.playerMove = indexPlayer;
      players.push(dataShip);
      this.storage.gameRooms.set(idRoom, room);
    } else {
      this.storage.gameRooms.set(idRoom, { players: [dataShip], playerMove: 0 });
    }
  }

  public changePlayerMove(idRoom: number, playerId: number) {
    const room = this.storage.gameRooms.get(idRoom);
    if (room) {
      room.playerMove = playerId;
    }
  }

  public getPlayerMove(idRoom: number) {
    return this.storage.gameRooms.get(idRoom)?.playerMove;
  }

  public deleteGameRoom(idRoom: number) {
    this.storage.gameRooms.delete(idRoom);
  }

  public getRoomGame(idRoom: number) {
    return this.storage.gameRooms.get(idRoom);
  }

  public getSizePlayers(idRoom: number) {
    const room = this.getRoomGame(idRoom);
    if (room) {
      return room.players.length;
    }
    return 0;
  }
}

export const gameRoomsBase = new GameRoomsController();
