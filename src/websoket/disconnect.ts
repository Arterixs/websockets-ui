import { TypeData } from '../types/enum/typeData.js';
import { gameRoomsBase, roomsBase, socketBase, userBase, winnersBase } from '../store/index.js';
import { ShipStorage, Socket } from '../types/types/common.js';
import { getResponseObject } from '../helpers/createrObjects.js';
import { DataBase } from '../types/interface/reg.js';
import { BOT_NAME } from '../constants/index.js';

export const disconnect = (socket: Socket) => {
  const user = userBase.getUser(socket);
  const name = user?.data.name;
  const index = user?.data.index;
  if (name && index) {
    const userData = userBase.getUserStorage(name)!;
    const { isGame, isOwnerRoom, idRoom, idGame, singlePlay } = userData;
    const allSockets = socketBase.getAllSocketsUsers();
    if (isOwnerRoom) {
      roomsBase.deleteRoom(idRoom);
      const actualRooms = roomsBase.getActualStringRoom();
      for (const sockUser of allSockets) {
        sockUser.send(getResponseObject(TypeData.UPDATE_ROOM, actualRooms));
      }
    }
    if (singlePlay) {
      winnersBase.setWinners(BOT_NAME);
      userBase.changeSinglePlay(name, false);
      const winners = winnersBase.getWinnersString();
      const allSock = socketBase.getAllSocketsUsers();
      for (const sockUser of allSock) {
        sockUser.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
      }
    }
    if (isGame) {
      const gamePlayers = gameRoomsBase.getRoomGame(idGame)?.players;
      if (gamePlayers) {
        const secondPlayer = gamePlayers
          .filter((players): players is ShipStorage => players.indexPlayer !== index)
          .at(0)!;
        const { indexPlayer } = secondPlayer;
        const secondSocket = socketBase.getSocketUser(indexPlayer)!;
        const secondeUserInfo = userBase.getUser(secondSocket)!;

        winnersBase.setWinners(secondeUserInfo.data.name);
        const winners = winnersBase.getWinnersString();

        secondSocket.send(getResponseObject(TypeData.FINISH, JSON.stringify({ winPlayer: indexPlayer })));
        for (const sockUser of allSockets) {
          sockUser.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
        }
      } else {
        const allUsersSocket: DataBase[] = [];
        for (const sockUser of allSockets) {
          const sock = userBase.getUser(sockUser);
          if (sock) {
            allUsersSocket.push(sock.data);
          }
        }
        const usersInGame = allUsersSocket.filter((data) => userBase.getUserStorage(data.name)?.idGame === idGame);
        const secondPlayer = usersInGame.find((player) => player.index !== index);
        const secondSocket = socketBase.getSocketUser(secondPlayer!.index)!;

        winnersBase.setWinners(secondPlayer!.name);
        const winners = winnersBase.getWinnersString();
        secondSocket.send(getResponseObject(TypeData.FINISH, JSON.stringify({ winPlayer: secondPlayer!.index })));

        const allSock = socketBase.getAllSocketsUsers();
        for (const sockUser of allSock) {
          sockUser.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
        }
      }
    }
    userBase.deleteUser(socket);
    socketBase.deleteSocket(index);
    userBase.changeStatusUser(name, false);
  }
};
