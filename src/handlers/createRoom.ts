import { Socket } from '../types/types/common.js';
import { RoomObject } from '../types/interface/room.js';
import { TypeData } from '../types/enum/typeData.js';
import { roomsBase, userBase, socketBase } from '../store/index.js';
import { createRoomObject, getResponseObject } from '../helpers/createrObjects.js';

export const createRoom = (_room: RoomObject, socket: Socket) => {
  if (userBase.checkUserDataBase(socket)) {
    const userObject = userBase.getUser(socket);
    if (userObject) {
      const { data } = userObject;
      const roomObject = createRoomObject(roomsBase.getRoomId(), data.name, data.index);
      roomsBase.createRoom(roomObject, data.index);
      const users = socketBase.getAllSocketsUsers();
      const rooms = roomsBase.getActualStringRoom();
      for (const user of users) {
        user.send(getResponseObject(TypeData.UPDATE_ROOM, rooms));
      }
    }
  }
};
