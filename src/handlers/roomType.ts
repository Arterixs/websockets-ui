import { Socket } from '../types/types/common.js';
import { RoomObject } from '../types/interface/room.js';
import { TypeData } from '../types/enum/typeData.js';
import { roomsBase, userBase, socketBase } from '../store/index.js';

const createObjectRoom = (data: string) => {
  const object = {
    type: TypeData.UPDATE_ROOM,
    data,
    id: 0,
  };
  return JSON.stringify(object);
};

const createDataObject = (roomId: number, name: string, index: number) => {
  const arrRoom = {
    roomId,
    idOwnerRoom: index,
    roomUsers: [
      {
        name,
        index,
      },
    ],
  };
  return arrRoom;
};

export const roomType = (_room: RoomObject, socket: Socket) => {
  if (userBase.checkUserDataBase(socket)) {
    const userObject = userBase.getUser(socket);
    if (userObject) {
      const { data } = userObject;
      const roomObject = createDataObject(roomsBase.getRoomId(), data.name, data.index);
      roomsBase.createRoom(roomObject, data.index);
      const users = socketBase.getAllSocketsUsers();
      const rooms = roomsBase.getActualStringRoom();
      const roomMessage = createObjectRoom(rooms);
      // eslint-disable-next-line no-restricted-syntax
      for (const user of users) {
        user.send(roomMessage);
      }
    }
  }
};
