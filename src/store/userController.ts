import { Socket } from 'src/types/types/index.js';
import { Storage } from './storage.js';
import { DataBase, UpdateUser } from '../types/interface/reg.js';

class UserController {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  public setUser(socket: Socket, user: UpdateUser) {
    this.storage.userDataBase.set(socket, user);
    this.storage.socketCommonsUser.set(user.data.index, socket);
    this.storage.increaseIdUsers();
  }

  public setUserStorage(user: DataBase) {
    const updateUSer = {
      ...user,
      status: true,
      isOwnerRoom: false,
      isGame: false,
      idRoom: 0,
      idGame: 0,
      singlePlay: false,
    };
    this.storage.userStorage.set(updateUSer.name, updateUSer);
  }

  public checkUserInStorage(name: string) {
    return this.storage.userStorage.has(name);
  }

  public getUserStorage(name: string) {
    return this.storage.userStorage.get(name);
  }

  public get() {
    return this.storage.userStorage;
  }

  public checkSinglePlay(name: string) {
    if (this.storage.userStorage.has(name)) {
      const user = this.storage.userStorage.get(name)!;
      return user.singlePlay;
    }
    return false;
  }

  public changeSinglePlay(name: string, single: boolean) {
    const user = this.storage.userStorage.get(name);
    this.storage.userStorage.set(name, { ...user!, singlePlay: single });
  }

  public changeStatusUser(name: string, status: boolean, isOwnerRoom = false, isGame = false) {
    const user = this.storage.userStorage.get(name);
    this.storage.userStorage.set(name, { ...user!, status, isOwnerRoom, isGame });
  }

  public changeUserGameId(name: string, idGame: number) {
    const user = this.storage.userStorage.get(name);
    this.storage.userStorage.set(name, { ...user!, idGame });
  }

  public changeUserRoomId(name: string, idRoom: number) {
    const user = this.storage.userStorage.get(name);
    this.storage.userStorage.set(name, { ...user!, idRoom });
  }

  public getAllUSers() {
    return this.storage.userDataBase.values();
  }

  public getIdUser() {
    return this.storage.idUsersGeneration;
  }

  public getUser(socket: Socket) {
    return this.storage.userDataBase.get(socket);
  }

  public checkUserDataBase(socket: Socket) {
    return this.storage.userDataBase.has(socket);
  }

  public deleteUser(socket: Socket) {
    this.storage.userDataBase.delete(socket);
  }
}

export const userBase = new UserController();
