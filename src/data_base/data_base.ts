import { Socket } from '../types/types/common.js';
import { TypeData } from '../types/enum/typeData.js';
import { UpdateUser } from '../types/interface/reg.js';
import { RoomData, RoomObject, RoomResponse } from '../types/interface/room.js';
import { DataRoom } from '../types/interface/addUser.js';

class Model {
  private userDataBase: Map<Socket, UpdateUser>;

  private roomDataBase: Map<number, RoomData>;

  private socketData: Map<number, Socket>;

  private idGeneration: number;

  private idRoomGeneration: number;

  constructor() {
    this.userDataBase = new Map();
    this.roomDataBase = new Map();
    this.socketData = new Map();
    this.idGeneration = 0;
    this.idRoomGeneration = 0;
  }

  public setData(socket: Socket, user: UpdateUser) {
    const userClone = user;
    userClone.data.index = this.idGeneration;
    this.userDataBase.set(socket, userClone);
    this.socketData.set(this.idGeneration, socket);
    this.increaseCounter();
    return { type: userClone.type, data: JSON.stringify(userClone.data), id: userClone.id };
  }

  public setRoomData(room: RoomData) {
    this.roomDataBase.set(this.idRoomGeneration, room);
    this.increaseRoomCounter();
  }

  public getSocketUsers(idUser: number) {
    return this.socketData.get(idUser);
  }

  public getRoom(idRoom: number) {
    return this.roomDataBase.get(idRoom);
  }

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

  public deleteRoom(idRoom: number) {
    this.roomDataBase.delete(idRoom);
  }

  public deleteUser(socket: Socket) {
    this.userDataBase.delete(socket);
  }

  public getSocketsUsers() {
    return this.userDataBase.keys();
  }
}

export const dataBase = new Model();
