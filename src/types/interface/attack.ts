import { TypeData } from '../enum/typeData.js';
import { StatusResultOfAttacks } from '../enum/typeResultAttack.js';
import { Position } from './addShips.js';

export interface AttackClient {
  type: TypeData.ATTACK;
  data: string;
  id: number;
}

export interface AttackData {
  gameId: number;
  x: number;
  y: number;
  indexPlayer: number;
}

export interface DataResultOfAttacks {
  position: Position;
  currentPlayer: number;
  status: StatusResultOfAttacks;
}

export interface DataNextPlayer {
  currentPlayer: number;
}
