import { TypeData } from './enum/typeData.js';
import { AddShips } from './interface/addShips.js';
import { AddUserToRoomClient } from './interface/addUser.js';
import { AttackClient } from './interface/attack.js';
import { RandomAttackClient } from './interface/randomAttack.js';
import { RegObject } from './interface/reg.js';
import { RoomObject } from './interface/room.js';

export const isRegObject = (obj: object): obj is RegObject => 'type' in obj && obj.type === TypeData.REG;

export const isRoomObject = (obj: object): obj is RoomObject => 'type' in obj && obj.type === TypeData.CREATE_ROOM;

export const isAddUserObject = (obj: object): obj is AddUserToRoomClient =>
  'type' in obj && obj.type === TypeData.ADD_USER_ROOM;

export const isShipsObject = (obj: object): obj is AddShips => 'type' in obj && obj.type === TypeData.ADD_SHIPS;

export const isAttackObject = (obj: object): obj is AttackClient => 'type' in obj && obj.type === TypeData.ATTACK;

export const isRandomAttackObject = (obj: object): obj is RandomAttackClient =>
  'type' in obj && obj.type === TypeData.RANDOM_ATTACK;
