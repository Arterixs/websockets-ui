import { TypeData } from '../types/enum/typeData.js';
import { dataBase } from '../data_base/data_base.js';
import { AddUserToRoomClient, DataRoom } from '../types/interface/addUser.js';
import { Socket } from '../types/types/common.js';

export const addGame = (object: AddUserToRoomClient, socket: Socket) => {
  const { data } = object;
  const convertData = JSON.parse(data) as DataRoom;
  const { indexRoom } = convertData;
  const room = dataBase.getRoom(indexRoom);
  const user = dataBase.getUserObject(socket);
  const arrUsersRoom = room?.roomUsers;
  const ownerId = arrUsersRoom?.at(0)?.index;
  if (room && user && ownerId && arrUsersRoom) {
    const socketOwnerRoom = dataBase.getSocketUsers(ownerId);
    if (socket === socketOwnerRoom) {
      return;
    }
    arrUsersRoom.push({ name: user.data.name, index: user.data.index });
    dataBase.deleteRoom(indexRoom);
    const arrUsersPlay = [socketOwnerRoom, socket];
    const idPlayesrs = [ownerId, user.data.index];
    arrUsersPlay.forEach((item, indx) => {
      if (item) {
        item.send(
          JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame: indexRoom, idPlayer: idPlayesrs[indx] }),
            id: 0,
          })
        );
        item.send(JSON.stringify({ type: TypeData.UPDATE_ROOM, data: JSON.stringify(room) }));
      }
    });
  }
};
