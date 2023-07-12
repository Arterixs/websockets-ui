import { NewShips, Socket } from '../types/types/common.js';
import { UpdateUser } from '../types/interface/reg.js';
import { DatabaseGameRooms, RoomData } from '../types/interface/room.js';
import { DataShips, ShipObjectMap } from '../types/interface/addShips.js';

class Model {
  private userDataBase: Map<Socket, UpdateUser>;

  private roomDataBase: RoomData[];

  private socketCommonsUser: Map<number, Socket>;

  private gameRooms: Map<number, DatabaseGameRooms>;

  private idGeneration: number;

  private idRoomGeneration: number;

  constructor() {
    this.userDataBase = new Map();
    this.roomDataBase = [];
    this.socketCommonsUser = new Map();
    this.gameRooms = new Map();
    this.idGeneration = 1;
    this.idRoomGeneration = 1;
  }

  // eslint-disable-next-line class-methods-use-this
  public createGameField(ships: DataShips[]) {
    const gameMap: ShipObjectMap[][] = [];
    for (let i = 0; i < 10; i += 1) {
      const column = [];
      for (let j = 0; j < 10; j += 1) {
        column.push({
          type: 'empty',
          length: 0,
          direction: false,
          positionX: j,
          positionY: i,
          truePositionX: j,
          truePositionY: i,
          hitpoint: 0,
          shoot: false,
        });
      }
      gameMap.push(column);
    }
    let commonHits = 0;
    ships.forEach((ship) => {
      const { position, direction, length, hitpoint } = ship;
      const { x, y } = position;
      commonHits += hitpoint;
      for (let i = 0; i < length; i += 1) {
        const objectShip = {
          type: 'ship',
          length,
          direction,
          positionX: x,
          positionY: y,
          truePositionX: direction ? x : x + i,
          truePositionY: direction ? y + i : y,
          hitpoint,
          shoot: false,
        };
        if (direction) {
          gameMap[y + i]![x] = objectShip;
        } else {
          gameMap[y]![x + i] = objectShip;
        }
      }
    });
    return { gameMap, commonHits };
  }

  public setDataGame(idRoom: number, dataTroops: NewShips) {
    const { gameMap, commonHits } = this.createGameField(dataTroops.ships);
    const { gameId, indexPlayer, ships } = dataTroops;
    const dataShip = { gameId, indexPlayer, gameMap, commonHits, ships };
    if (this.gameRooms.has(idRoom)) {
      const room = this.gameRooms.get(idRoom)!;
      const { players } = room;
      room.playerMove = indexPlayer;
      players.push(dataShip);
      this.gameRooms.set(idRoom, room);
    } else {
      this.gameRooms.set(idRoom, { players: [dataShip], playerMove: 0 });
    }
  }

  public changePlayerMove(idRoom: number, playerId: number) {
    const room = this.gameRooms.get(idRoom);
    if (room) {
      room.playerMove = playerId;
    }
  }

  public getPlayerMove(idRoom: number) {
    return this.gameRooms.get(idRoom)?.playerMove;
  }

  // public updateRoomGame(idRoom: number, dataTroops: ShipStorage[]) {
  //   this.gameRooms.set(idRoom, dataTroops);
  // }

  public getRoomGame(idRoom: number) {
    return this.gameRooms.get(idRoom);
  }

  public getSizePlayers(idRoom: number) {
    const room = this.getRoomGame(idRoom);
    if (room) {
      return room.players.length;
    }
    return 0;
  }

  public setUser(socket: Socket, user: UpdateUser) {
    this.userDataBase.set(socket, user);
    this.socketCommonsUser.set(user.data.index, socket);
    this.increaseCounter();
  }

  public getUser(socket: Socket) {
    return this.userDataBase.get(socket);
  }

  public createRoom(room: RoomData, indexPlayer: number) {
    const isCheckCreater = this.checkPlayerCreater(indexPlayer);
    if (!isCheckCreater) {
      this.roomDataBase.push(room);
      this.increaseRoomCounter();
    }
  }

  public getActualStringRoom() {
    return JSON.stringify(this.roomDataBase);
  }

  private checkPlayerCreater(indexPlayer: number) {
    const checkPlayerCreate = this.roomDataBase.reduce((acc: boolean[], item) => {
      const isPlayer = item.roomUsers.find((userData) => userData.index === indexPlayer);
      if (isPlayer) {
        acc.push(true);
        return acc;
      }
      acc.push(false);
      return acc;
    }, []);
    const isCreater = checkPlayerCreate.some((item) => item);
    return isCreater;
  }

  public getSocketUsers(idUser: number) {
    return this.socketCommonsUser.get(idUser);
  }

  public getIdUser() {
    return this.idGeneration;
  }

  public getRoom(idRoom: number) {
    return this.roomDataBase.find((item) => item.roomId === idRoom);
  }

  public checkUserDataBase(socket: Socket) {
    return this.userDataBase.has(socket);
  }

  private increaseCounter() {
    this.idGeneration += 1;
  }

  public getRoomId() {
    return this.idRoomGeneration;
  }

  private increaseRoomCounter() {
    this.idRoomGeneration += 1;
  }

  public deleteRoom(idRoom: number) {
    const updateArray = this.roomDataBase.filter((item) => item.roomId !== idRoom);
    this.roomDataBase = updateArray;
  }

  public deleteUser(socket: Socket) {
    this.userDataBase.delete(socket);
  }

  public getSocketsUsers() {
    return this.socketCommonsUser.values();
  }
}

export const dataBase = new Model();
