import { Storage } from './storage.js';

class SocketController {
  private storage: Storage;

  constructor() {
    this.storage = new Storage();
  }

  public getAllSocketsUsers() {
    return this.storage.socketCommonsUser.values();
  }

  public getSocketUser(idUser: number) {
    return this.storage.socketCommonsUser.get(idUser);
  }

  public deleteSocket(idUser: number) {
    this.storage.socketCommonsUser.delete(idUser);
  }
}

export const socketBase = new SocketController();
