import { TypeData } from '../enum/typeData.js';
import { ShipStorage } from '../types/index.js';

export interface RoomObject {
  type: TypeData.CREATE_ROOM;
  data: string;
  id: number;
}

export interface RoomResponse {
  type: TypeData;
  data: RoomData[];
  id: number;
}

export interface RoomData {
  roomId: number;
  idOwnerRoom: number;
  roomUsers: RoomUsers[];
}

interface RoomUsers {
  name: string;
  index: number;
}

export interface DatabaseGameRooms {
  players: ShipStorage[];
  playerMove: number;
}
