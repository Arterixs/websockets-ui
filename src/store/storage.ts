import { Socket, UserStorage } from '../types/types/common.js';
import { UpdateUser } from '../types/interface/reg.js';
import { DatabaseGameRooms, RoomData } from '../types/interface/room.js';
import { Winners } from '../types/interface/winners.js';

export class Storage {
  public userDataBase: Map<Socket, UpdateUser> = new Map();

  public roomDataBase: RoomData[] = [];

  public userStorage: Map<string, UserStorage> = new Map();

  public winners: Winners[] = [];

  public socketCommonsUser: Map<number, Socket> = new Map();

  public gameRooms: Map<number, DatabaseGameRooms> = new Map();

  public idUsersGeneration: number;

  public idRoomGeneration: number;

  private static instanse: Storage;

  constructor() {
    if (Storage.instanse) {
      return Storage.instanse;
    }
    Storage.instanse = this;
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
