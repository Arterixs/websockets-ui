import { TypeData } from '../enum/typeData.js';

export interface RandomAttackClient {
  type: TypeData.RANDOM_ATTACK;
  data: string;
  id: number;
}

export interface DataRandAttact {
  gameId: number;
  indexPlayer: number;
}
