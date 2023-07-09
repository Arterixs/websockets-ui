import { Socket } from '../types/types/common.js';
import { UpdateUser } from '../types/interface/reg.js';
import { RoomData } from '../types/interface/room.js';
import { PositionShipsObject } from '../types/interface/position.js';

class Model {
  private userDataBase: Map<Socket, UpdateUser>;

  private roomDataBase: RoomData[];

  private socketCommonsUser: Map<number, Socket>;

  private gameRooms: Map<number, PositionShipsObject[]>;

  private idGeneration: number;

  private idRoomGeneration: number;

  constructor() {
    this.userDataBase = new Map();
    this.roomDataBase = [];
    this.socketCommonsUser = new Map();
    this.gameRooms = new Map();
    this.idGeneration = 1;
    this.idRoomGeneration = 0;
  }

  public setDataGame(idRoom: number, dataTroops: PositionShipsObject) {
    if (this.gameRooms.has(idRoom)) {
      const room = this.gameRooms.get(idRoom) as PositionShipsObject[];
      room.push(dataTroops);
      this.gameRooms.set(idRoom, room);
    } else {
      this.gameRooms.set(idRoom, [dataTroops]);
    }
  }

  public getRoomGame(idRoom: number) {
    const room = this.gameRooms.get(idRoom);
    return room;
  }

  public getSizePlayers() {
    return this.gameRooms.size;
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
