import { Socket } from '../types/types/common.js';
import { RoomObject } from '../types/interface/room.js';
import { dataBase } from '../data_base/data_base.js';
import { TypeData } from '../types/enum/typeData.js';

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
  if (dataBase.checkUserDataBase(socket)) {
    const userObject = dataBase.getUserObject(socket);
    if (userObject) {
      const { data } = userObject;
      const roomObject = createDataObject(dataBase.getRoomId(), data.name, data.index);
      dataBase.setRoomData(roomObject);
      const users = dataBase.getSocketsUsers();
      const roomMessage = createObjectRoom(JSON.stringify([roomObject]));
      // eslint-disable-next-line no-restricted-syntax
      for (const user of users) {
        user.send(roomMessage);
      }
    }
  }
};
