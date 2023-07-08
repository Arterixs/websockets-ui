import WebSocket from 'ws';
import { RegObject } from '../interface/reg.js';
import { RoomObject } from '../interface/room.js';
import { AddUserToRoomClient } from '../interface/addUser.js';

export type Socket = WebSocket;
export type ClientReqData = RegObject | RoomObject | AddUserToRoomClient;
