import { translateToEnglish } from "./lib";

type Turn = "r"|"l";
type Direction = "n"|"e"|"s"|"w";

/**
 * Robot
 */
export const Robot = (function() {
  const originalPosition: string = "11"
  let currentPosition: string = originalPosition
  const originalDirection: Direction = "n"
  let currentDirection: Direction = originalDirection

  /**
   * Draw takes in new direction and new position
   * Then it draws the robot at correct div
   * @param newDirection Direction
   * @param newPosition string
   */
  const draw = (newDirection: Direction, newPosition: string) => {
    // Check if next move is possible
    const newBox = document.querySelector<HTMLDivElement>(`#box-${newPosition}`);
    if (newBox) {
      const box = document.querySelector<HTMLDivElement>(`#box-${currentPosition}`);
      if (box) {
        box.classList.remove("robot", `${currentDirection}`);
        box.innerHTML = '';
      }
      newBox.classList.add("robot", `${newDirection}`);
      newBox.innerHTML = '<img src="/robot.svg" />';
      const positionHtml = document.querySelector<HTMLDivElement>("#position");
      if (positionHtml) {
        positionHtml.innerHTML = `${newPosition} ${newDirection}`
      }
      currentDirection = newDirection;
      currentPosition = newPosition;
    }
  }

  /**
   * Turn takes in what side to turn to and returns the new direction
   * @param side Turn
   * @param direction Direction
   * @returns Direction
   */
  const turn = (side: Turn, direction: Direction): Direction => {
    switch (direction) {
      case 'n':
        return side === 'l' ? 'w' : 'e';
      case 'e':
        return side === 'l' ? 'n' : 's';
      case 's':
        return side === 'l' ? 'e' : 'w';
      case 'w':
        return side === 'l' ? 's' : 'n';
      default:
        return direction;
    }
  }

  /**
   * Go takes direction and last position and returns a new position
   * @param direction Direction
   * @param oldPosition string
   * @returns
   */
  const go = (direction: Direction, oldPosition: string): string => {
    switch (direction) {
        case "n":
          return (Number(oldPosition.charAt(0)) - 1).toString() + oldPosition.charAt(1);
        case "e":
          return oldPosition.charAt(0) + (Number(oldPosition.charAt(1)) + 1).toString();
        case "s":
          return (Number(oldPosition.charAt(0)) + 1).toString() + oldPosition.charAt(1);
        case "w":
          return oldPosition.charAt(0) + (Number(oldPosition.charAt(1)) - 1).toString();
        default:
          return oldPosition;
      }
  }

  /**
   * Move finds out if the instruction is a new direction or a move
   * Then it send the new direction and position to draw
   * @param instruction string
   */
  const move = (instruction: string) => {
    const tDirection = translateToEnglish(instruction);
    let newDirection = currentDirection;
    let newPosition = currentPosition;
    if (["r", "l"].indexOf(tDirection) > -1) {
      newDirection = turn(tDirection as Turn, newDirection);
    }
    if (tDirection === "f") {
      newPosition = go(newDirection, currentPosition);
    }
    draw(newDirection, newPosition);
  }

  /**
   * Remove the robot
   */
  const remove = () => {
    const robot = document.querySelector<HTMLDivElement>(`.robot`);
    if (robot) {
      robot.classList.remove(...robot.classList);
      robot.classList.add("box");
      robot.innerHTML = '';
    }
  }

  /**
   * Reset the playground
   */
  const reset = () => {
    remove();
    currentDirection = originalDirection;
    currentPosition = originalPosition
    draw(currentDirection, currentPosition);
  }

  return {
    draw: draw,
    move: move,
    reset: reset
  }
})()