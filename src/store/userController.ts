import { Socket } from 'src/types/types/common.js';
import { Storage } from './storage.js';
import { UpdateUser } from '../types/interface/reg.js';

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
