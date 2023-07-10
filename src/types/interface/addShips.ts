import { TypeData } from '../enum/typeData.js';

export interface AddShips {
  type: TypeData.ADD_SHIPS;
  data: string;
  id: number;
}

export interface DataShips {
  position: Position;
  direction: boolean;
  type: 'large' | 'medium' | 'small' | 'huge';
  length: number;
  hitpoint: number;
}

export interface Position {
  x: number;
  y: number;
}

export interface ShipObjectMap {
  type: string;
  length: number;
  direction: boolean;
  positionX: number;
  positionY: number;
  hitpoint: number;
}
