import { Socket } from '../types/types/common.js';
import { UpdateUser } from '../types/interface/reg.js';
import { DatabaseGameRooms, RoomData } from '../types/interface/room.js';
import { Winners } from '../types/interface/winners.js';

export class Storage {
  public userDataBase: Map<Socket, UpdateUser>;

  public roomDataBase: RoomData[];

  public winners: Winners[];

  public socketCommonsUser: Map<number, Socket>;

  public gameRooms: Map<number, DatabaseGameRooms>;

  public idUsersGeneration: number;

  public idRoomGeneration: number;

  private static instanse: Storage;

  constructor() {
    if (Storage.instanse) {
      return Storage.instanse;
    }
    Storage.instanse = this;

    this.userDataBase = new Map();
    this.roomDataBase = [];
    this.winners = [];
    this.socketCommonsUser = new Map();
    this.gameRooms = new Map();
    this.idUsersGeneration = 1;
    this.idRoomGeneration = 1;
  }

  public increaseIdUsers() {
    this.idUsersGeneration += 1;
  }

  public increaseIdRooms() {
    this.idRoomGeneration += 1;
  }
}
