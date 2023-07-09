import WebSocket from 'ws';
import { RegObject } from '../interface/reg.js';
import { RoomObject } from '../interface/room.js';
import { AddUserToRoomClient } from '../interface/addUser.js';
import { AddShips } from '../interface/addShips.js';
import { AttackClient } from '../interface/attack.js';

export type Socket = WebSocket;
export type ClientReqData = RegObject | RoomObject | AddUserToRoomClient | AddShips | AttackClient;
