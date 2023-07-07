import { TypeData } from '../enum/typeData.js';

export interface RoomObject {
  type: TypeData.CREATE_ROOM;
  data: string;
  id: number;
}

export interface RoomResponse {
  type: TypeData;
  data: DataRoom[];
  id: number;
}

interface DataRoom {
  roomId: number;
  roomUsers: RoomUsers[];
}

interface RoomUsers {
  name: string;
  index: number;
}
