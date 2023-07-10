import { TypeShips } from '../enum/typeShips.js';

export interface PositionShipsObject {
  gameId: number;
  indexPlayer: number;
  ships: ShipsObject[];
}

export interface ShipsObject {
  position: ShipCoords;
  direction: boolean;
  type: TypeShips;
  length: number;
}

export interface ShipCoords {
  x: number;
  y: number;
}
