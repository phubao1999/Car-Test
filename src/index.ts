import { CurrentProcess, Direction } from "./enum/enum";
import { CarData, Position, CurrentPosition } from "./model/index";

function getProcessData(
  max: Position,
  current: CurrentPosition,
  process: string
): CurrentPosition {
  let _current = current;

  switch (process) {
    case CurrentProcess.L:
      _current = turnLeft(_current);
      break;
    case CurrentProcess.R:
      _current = turnRight(_current);
      break;
    case CurrentProcess.F:
      _current = forward(_current, max);
      break;
  }

  return _current;
}

function forward(current: CurrentPosition, max: Position): CurrentPosition {
  let _current = current;
  switch (_current.direction) {
    case Direction.E:
      if (_current.position.x < max.x) {
        _current.position.x++;
      }
      break;
    case Direction.W:
      if (_current.position.x > 0) {
        _current.position.x--;
      }
      break;
    case Direction.S:
      if (_current.position.y < max.y) {
        _current.position.y++;
      }
      break;
    case Direction.N:
      if (_current.position.y > 0) {
        _current.position.y--;
      }
  }

  return _current;
}

function turnLeft(current: CurrentPosition): CurrentPosition {
  let _current = current;

  switch (_current.direction) {
    case Direction.E:
      _current.direction = Direction.N;
      break;
    case Direction.W:
      _current.direction = Direction.S;
      break;
    case Direction.S:
      _current.direction = Direction.E;
      break;
    case Direction.N:
      _current.direction = Direction.W;
      break;
  }

  return _current;
}

function turnRight(current: CurrentPosition): CurrentPosition {
  let _current = current;

  switch (_current.direction) {
    case Direction.E:
      _current.direction = Direction.S;
      break;
    case Direction.W:
      _current.direction = Direction.N;
      break;
    case Direction.S:
      _current.direction = Direction.W;
      break;
    case Direction.N:
      _current.direction = Direction.E;
      break;
    default:
      break;
  }
  return _current;
}

function showDirection(carData: CarData, max: Position): void {
  let _carData = carData;
  for (let i = 0; i < _carData.data.length; i++) {
    _carData.currentPosition = getProcessData(
      max,
      _carData.currentPosition,
      carData.data[i]
    );
  }

  console.log(
    `Car ${_carData.label} Position at: ${_carData.currentPosition.position.x} ${_carData.currentPosition.position.y} ${_carData.currentPosition.direction}`
  );
}

function checkCollide(carList: CarData[], max: Position): void {
  const maxMove = carList.sort((a, b) => b.data.length - a.data.length)[0].data
    .length;
  let collide = false;

  for (let i = 0; i < maxMove; i++) {
    carList.forEach((car) => {
      if (i <= car.data.length) {
        car.currentPosition = getProcessData(
          max,
          car.currentPosition,
          car.data[i].toString()
        );
      }
    });

    setTimeout(() => {
      for (let k = 0; k < carList.length; k++) {
        for (let j = k + 1; j < carList.length; j++) {
          if (
            carList[k].currentPosition.position.y ===
            carList[j].currentPosition.position.y
          ) {
            console.log("Collision:");
            console.log(`${carList[k].label} ${carList[j].label}`);
            console.log(
              `${carList[k].currentPosition.position.x} ${carList[k].currentPosition.position.y}`
            );
            console.log(i + 1);
          }
        }
      }
    });
  }

  if (!collide) {
    console.log("No Collision");
  }
}

function runPart1(): void {
  const max = new Position(9, 9);
  console.log("Part 1 Start");
  console.log("=========");
  const carFirst = new CarData(
    "BMW",
    new CurrentPosition(new Position(1, 2), Direction.N),
    "FFRFFFRRLF"
  );

  showDirection(carFirst, max);
}

function runPart2(): void {
  const max = new Position(9, 9);
  console.log("Part 2 Start");
  console.log("===========");
  const carA = new CarData(
    "Ferrari",
    new CurrentPosition(new Position(1, 2), Direction.N),
    "FFRFFFFRRL"
  );
  const carB = new CarData(
    "Lamborghini",
    new CurrentPosition(new Position(7, 8), Direction.W),
    "FFLFFFFFFF"
  );

  checkCollide([carA, carB], max);
}

runPart1();
runPart2();
