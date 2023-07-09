import { Socket } from '../types/types/common.js';
import { UpdateUser } from '../types/interface/reg.js';
import { RoomData } from '../types/interface/room.js';
import { ShipsObject } from '../types/interface/position.js';

class Model {
  private userDataBase: Map<Socket, UpdateUser>;

  // private roomDataBase: Map<number, RoomData[]>;

  private roomDataBase: RoomData[];

  private socketCommonsUser: Map<number, Socket>;

  private game: Map<number, ShipsObject[]>;

  private idGeneration: number;

  private idRoomGeneration: number;

  constructor() {
    this.userDataBase = new Map();
    // this.roomDataBase = new Map();
    this.roomDataBase = [];
    this.socketCommonsUser = new Map();
    this.game = new Map();
    this.idGeneration = 1;
    this.idRoomGeneration = 0;
  }

  public setDataGame(idPlayer: number, dataTroops: ShipsObject[]) {
    this.game.set(idPlayer, dataTroops);
  }

  public getDataGames() {
    return this.game.entries();
  }

  public getSizePlayers() {
    return this.game.size;
  }

  public setData(socket: Socket, user: UpdateUser) {
    const userClone = user;
    userClone.data.index = this.idGeneration;
    this.userDataBase.set(socket, userClone);
    this.socketCommonsUser.set(this.idGeneration, socket);
    this.increaseCounter();
    return { type: userClone.type, data: JSON.stringify(userClone.data), id: userClone.id };
  }

  // public setRoomData(room: RoomData) {
  //   // this.roomDataBase.set(this.idRoomGeneration, room);
  //   this.increaseRoomCounter();
  // }

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

  // public getRoom(idRoom: number) {
  //   return this.roomDataBase.get(idRoom);
  // }

  public getUserObject(socket: Socket) {
    return this.userDataBase.get(socket);
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

  // public deleteRoom(idRoom: number) {
  //   this.roomDataBase.delete(idRoom);
  // }

  public deleteUser(socket: Socket) {
    this.userDataBase.delete(socket);
  }

  public getSocketsUsers() {
    return this.userDataBase.keys();
  }
}

export const dataBase = new Model();
