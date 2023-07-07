import { Socket } from '../types/types/websoket.js';
import { RoomObject } from '../types/interface/room.js';
import { dataBase } from '../data_base/data_base.js';
import { TypeData } from '../types/enum/typeData.js';

const createObjectRoom = (name: string, index: number, roomId: number) => {
  const object = {
    type: TypeData.UPDATE_ROOM,
    data: [
      {
        roomId,
        roomUsers: [
          {
            name,
            index,
          },
        ],
      },
    ],
    id: 0,
  };
  return object;
};

export const roomType = (_room: RoomObject, socket: Socket) => {
  if (dataBase.checkUserDataBase(socket)) {
    const userObject = dataBase.getUserObject(socket);
    if (userObject) {
      const { data } = userObject;
      const roomObject = createObjectRoom(data.name, data.index, dataBase.getRoomId());
      dataBase.setRoomData(roomObject);
      socket.send(JSON.stringify({ ...roomObject, data: JSON.stringify(roomObject.data) }));
    }
  }
};
