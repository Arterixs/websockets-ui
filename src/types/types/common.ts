import WebSocket from 'ws';
import { RegObject } from '../interface/reg.js';
import { RoomObject } from '../interface/room.js';
import { AddUserToRoomClient } from '../interface/addUser.js';
import { AddShips, ShipObjectMap } from '../interface/addShips.js';
import { AttackClient } from '../interface/attack.js';
import { PositionShipsObject, ShipsObject } from '../interface/position.js';

export type Socket = WebSocket;
export type ClientReqData = RegObject | RoomObject | AddUserToRoomClient | AddShips | AttackClient;
type UpgradeShips = ShipsObject & { hitpoint: number };
export type NewShips = Pick<PositionShipsObject, 'gameId' | 'indexPlayer'> & { ships: UpgradeShips[] };
export type ShipStorage = NewShips & {
  gameMap: ShipObjectMap[][];
  commonHits: number;
};
