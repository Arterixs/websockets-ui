import { TypeData } from '../enum/typeData.js';

export interface AttackClient {
  type: TypeData.ATTACK;
  data: string;
  id: number;
}

interface AttackData {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}
