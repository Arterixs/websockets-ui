import { TypeData } from '../types/enum/typeData.js';
import { AddUserToRoomClient, DataRoom } from '../types/interface/addUser.js';
import { Socket } from '../types/types/common.js';
import { roomsBase, userBase, socketBase } from '../store/index.js';

export const addGame = (object: AddUserToRoomClient, socket: Socket) => {
  const { data } = object;
  const convertData = JSON.parse(data) as DataRoom;
  const idRoom = convertData.indexRoom;
  const room = roomsBase.getRoom(idRoom);
  const currentUser = userBase.getUser(socket);
  const arrUsersInRoom = room?.roomUsers;
  const ownerId = arrUsersInRoom?.at(0)?.index;
  if (room && currentUser && ownerId && arrUsersInRoom) {
    const socketOwnerRoom = socketBase.getSocketUser(ownerId);
    if (socket === socketOwnerRoom) {
      return;
    }
    arrUsersInRoom.push({ name: currentUser.data.name, index: currentUser.data.index });
    const checkCurrentRoom = roomsBase.getRoomDataBase();
    const index = checkCurrentRoom.find((user) => user.idOwnerRoom === currentUser.data.index);
    if (index) {
      roomsBase.deleteRoom(index.roomId);
    }
    roomsBase.deleteRoom(idRoom);
    const arrUsersPlayInRoom = [socketOwnerRoom, socket];
    const idPlayers = [ownerId, currentUser.data.index];
    const allUsersSocket = socketBase.getAllSocketsUsers();
    const updateRooms = roomsBase.getActualStringRoom();
    arrUsersPlayInRoom.forEach((item, indx) => {
      if (item) {
        item.send(
          JSON.stringify({
            type: 'create_game',
            data: JSON.stringify({ idGame: idRoom, idPlayer: idPlayers[indx] }),
            id: 0,
          })
        );
      }
    });
    // eslint-disable-next-line no-restricted-syntax
    for (const userSocket of allUsersSocket) {
      userSocket.send(JSON.stringify({ type: TypeData.UPDATE_ROOM, data: updateRooms }));
    }
  }
};
