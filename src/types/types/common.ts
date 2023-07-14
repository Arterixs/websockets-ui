import WebSocket from 'ws';
import { DataBase, RegObject } from '../interface/reg.js';
import { RoomObject } from '../interface/room.js';
import { AddUserToRoomClient } from '../interface/addUser.js';
import { AddShips, ShipObjectMap } from '../interface/addShips.js';
import { AttackClient } from '../interface/attack.js';
import { PositionShipsObject, ShipsObject } from '../interface/position.js';
import { RandomAttackClient } from '../interface/randomAttack.js';

export type Socket = WebSocket;
export type ClientReqData = RegObject | RoomObject | AddUserToRoomClient | AddShips | AttackClient | RandomAttackClient;
export type UpgradeShips = ShipsObject & { hitpoint: number };
export type NewShips = Pick<PositionShipsObject, 'gameId' | 'indexPlayer'> & { ships: UpgradeShips[] };
export type ShipStorage = NewShips & {
  gameMap: ShipObjectMap[][];
  commonHits: number;
};

export type UserStorage = DataBase & {
  status: boolean;
  isOwnerRoom: boolean;
  isGame: boolean;
  idRoom: number;
  idGame: number;
};
