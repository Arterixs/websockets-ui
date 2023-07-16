import { RoomData } from '../types/interface/room.js';
import { Storage } from './storage.js';

class RoomsController {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  public createRoom(room: RoomData, indexPlayer: number) {
    const isCheckCreater = this.checkPlayerCreater(indexPlayer);
    if (!isCheckCreater) {
      this.storage.roomDataBase.push(room);
      this.storage.increaseIdRooms();
    }
  }

  public getActualStringRoom() {
    return JSON.stringify(this.storage.roomDataBase);
  }

  private checkPlayerCreater(indexPlayer: number) {
    const checkPlayerCreate = this.storage.roomDataBase.reduce((acc: boolean[], item) => {
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

  public getRoomDataBase() {
    return this.storage.roomDataBase;
  }

  public getRoom(idRoom: number) {
    return this.storage.roomDataBase.find((item) => item.roomId === idRoom);
  }

  public deleteRoom(idRoom: number) {
    const updateArray = this.storage.roomDataBase.filter((item) => item.roomId !== idRoom);
    this.storage.roomDataBase = updateArray;
  }

  public getNewRoomId() {
    return this.storage.idRoomGeneration;
  }

  public generateIdRoom() {
    this.storage.increaseIdRooms();
  }
}

export const roomsBase = new RoomsController();
