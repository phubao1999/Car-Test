import { Direction } from "../enum/enum";

export class Position {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class CurrentPosition {
  public position: Position;
  public direction: Direction;

  constructor(position: Position, direction: Direction) {
    this.position = position;
    this.direction = direction;
  }
}

export class CarData {
  public label: string;
  public currentPosition: CurrentPosition;
  public data: string;

  constructor(label: string, currentPosition: CurrentPosition, data: string) {
    this.label = label;
    this.currentPosition = currentPosition;
    this.data = data;
  }
}
