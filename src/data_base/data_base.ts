import { Socket } from '../types/types/websoket.js';
import { TypeData } from '../types/enum/typeData.js';
import { UpdateUser } from '../types/interface/reg.js';
import { RoomObject, RoomResponse } from '../types/interface/room.js';

class Model {
  private userDataBase: Map<Socket, UpdateUser>;

  private roomDataBase: Map<number, RoomResponse>;

  private idGeneration: number;

  private idRoomGeneration: number;

  constructor() {
    this.userDataBase = new Map();
    this.roomDataBase = new Map();
    this.idGeneration = 0;
    this.idRoomGeneration = 0;
  }

  public setData(socket: Socket, user: UpdateUser) {
    const userClone = user;
    userClone.data.index = this.idGeneration;
    this.userDataBase.set(socket, userClone);
    this.increaseCounter();
    return { type: userClone.type, data: JSON.stringify(userClone.data), id: userClone.id };
  }

  public setRoomData(room: RoomResponse) {
    this.roomDataBase.set(this.idRoomGeneration, room);
    this.increaseRoomCounter();
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
}

export const dataBase = new Model();
