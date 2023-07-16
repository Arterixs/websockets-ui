import { randomAttack } from '../handlers/randomAttack.js';
import { TypeData } from '../types/enum/typeData.js';
import { RandomAttackClient } from '../types/interface/randomAttack.js';

export const shootBot = (gameId: number) => {
  const dataObj = JSON.stringify({ gameId, indexPlayer: 0 });
  const object = { type: TypeData.RANDOM_ATTACK, data: dataObj, id: 0 } as RandomAttackClient;
  setTimeout(() => randomAttack(object), 1000);
};
