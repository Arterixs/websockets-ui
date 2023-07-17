import { TypeData } from '../types/enum/typeData.js';
import { AddUserToRoomClient, DataRoom } from '../types/interface/addUser.js';
import { Socket } from '../types/types/index.js';
import { roomsBase, userBase, socketBase } from '../store/index.js';
import { getResponseObject } from '../helpers/createrObjects.js';

export const startGame = (object: AddUserToRoomClient, socket: Socket) => {
  const { indexRoom } = JSON.parse(object.data) as DataRoom;
  const room = roomsBase.getRoom(indexRoom);
  const currentUser = userBase.getUser(socket);
  const arrUsersInRoom = room?.roomUsers;
  const ownerRoom = arrUsersInRoom?.at(0);
  if (room && currentUser && ownerRoom && arrUsersInRoom) {
    const { index, name } = ownerRoom;
    const socketOwnerRoom = socketBase.getSocketUser(index);
    if (socket === socketOwnerRoom) {
      return;
    }
    arrUsersInRoom.push({ name: currentUser.data.name, index: currentUser.data.index });
    const checkCurrentRoom = roomsBase.getRoomDataBase();
    const currentPlayerRoom = checkCurrentRoom.find((user) => user.idOwnerRoom === currentUser.data.index);
    if (currentPlayerRoom) {
      roomsBase.deleteRoom(currentPlayerRoom.roomId);
      userBase.changeUserRoomId(currentUser.data.name, 0);
    }
    roomsBase.deleteRoom(indexRoom);
    userBase.changeStatusUser(currentUser.data.name, true, false, true);
    userBase.changeUserGameId(currentUser.data.name, indexRoom);
    userBase.changeStatusUser(name, true, false, true);
    userBase.changeUserGameId(name, indexRoom);
    const arrUsersPlayInRoom = [socketOwnerRoom, socket];
    const idPlayers = [index, currentUser.data.index];
    const allUsersSocket = socketBase.getAllSocketsUsers();
    const updateRooms = roomsBase.getActualStringRoom();
    arrUsersPlayInRoom.forEach((userSocket, indx) => {
      if (userSocket) {
        userSocket.send(
          getResponseObject(TypeData.CREATE_GAME, JSON.stringify({ idGame: indexRoom, idPlayer: idPlayers[indx] }))
        );
      }
    });
    for (const userSocket of allUsersSocket) {
      userSocket.send(getResponseObject(TypeData.UPDATE_ROOM, updateRooms));
    }
  }
};
