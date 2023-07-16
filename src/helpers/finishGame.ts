import { gameRoomsBase, socketBase, userBase, winnersBase } from '../store/index.js';
import { Socket } from '../types/types/common.js';
import { getResponseObject } from './createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';
import { BOT_NAME } from '../constants/index.js';

export const finishGame = (socketsArray: Socket[], indexPlayer: number, gameId: number) => {
  const allUsers = socketBase.getAllSocketsUsers();
  gameRoomsBase.deleteGameRoom(gameId);

  const userWin = userBase.getUser(socketsArray[0]!);
  const userLose = userBase.getUser(socketsArray[1]!);
  const name = indexPlayer === 0 ? BOT_NAME : userWin?.data.name;
  const nameLose = userLose?.data.name;
  if (name) {
    winnersBase.setWinners(name);
    userBase.changeStatusUser(name, true, false, false);
    userBase.changeUserRoomId(name, 0);
  }
  if (nameLose) {
    userBase.changeStatusUser(nameLose, true, false, false);
    userBase.changeUserRoomId(nameLose, 0);
  }
  const winners = winnersBase.getWinnersString();

  socketsArray.forEach((webSocket) => {
    webSocket.send(getResponseObject(TypeData.FINISH, JSON.stringify({ winPlayer: indexPlayer })));
  });

  for (const user of allUsers) {
    user.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
  }
};
