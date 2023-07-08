import { TypeData } from '../enum/typeData.js';

export interface AddUserToRoomClient {
  type: TypeData.ADD_USER_ROOM;
  data: string;
  id: number;
}

export interface DataRoom {
  indexRoom: number;
}
