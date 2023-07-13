import { gameRoomsBase, socketBase, userBase, winnersBase } from '../store/index.js';
import { Socket } from '../types/types/common.js';
import { getResponseObject } from './createrObjects.js';
import { TypeData } from '../types/enum/typeData.js';

export const finishGame = (socketsArray: Socket[], indexPlayer: number, gameId: number) => {
  const allUsers = socketBase.getAllSocketsUsers();
  gameRoomsBase.deleteGameRoom(gameId);
  const userWin = userBase.getUser(socketsArray[0]!);
  const name = userWin?.data.name;
  if (name) {
    winnersBase.setWinners(name);
  }
  const winners = winnersBase.getWinnersString();

  socketsArray.forEach((webSocket) => {
    webSocket.send(getResponseObject(TypeData.FINISH, JSON.stringify({ winPlayer: indexPlayer })));
  });

  for (const user of allUsers) {
    user.send(getResponseObject(TypeData.UPDATE_WINNERS, winners));
  }
};
