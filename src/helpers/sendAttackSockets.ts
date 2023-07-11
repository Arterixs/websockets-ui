import { DataNextPlayer, DataResultOfAttacks } from 'src/types/interface/attack.js';
import { Socket } from '../types/types/common.js';
import { TypeData } from '../types/enum/typeData.js';

export const sendAttackSockets = (
  socketsArray: Socket[],
  data: DataResultOfAttacks,
  dataNextStep: DataNextPlayer,
  isSendStep: boolean
) => {
  socketsArray.forEach((webSocket) => {
    webSocket.send(
      JSON.stringify({
        type: TypeData.ATTACK,
        id: 0,
        data: JSON.stringify(data),
      })
    );
    if (isSendStep) {
      webSocket.send(JSON.stringify({ type: TypeData.TURN, data: JSON.stringify(dataNextStep), id: 0 }));
    }
  });
};
