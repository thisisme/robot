import { translateToEnglish } from "./lib";
import { fabric } from "fabric";

type Turn = "r"|"l"
type Direction = "n"|"e"|"s"|"w"

/**
 * Robot
 */
export const Robot = (function() {
  const canvas = new fabric.Canvas('c')
  let robot: any = undefined
  let border: any = undefined
  let size = canvas.getWidth() / 5
  canvas.selection = false
  let originalPosition: {left: number, top: number} = {
    left: 10,
    top:20
  }
  const originalDirection: number = 0
  let currentDirection: number = originalDirection
  const position = document.querySelector("#position")

  /**
   * Turn takes in what side to turn to and returns the new direction
   * @param side Turn
   * @param angle number
   * @returns Direction
   */
  const turn = (side: Turn): number => {
    switch (side) {
      case 'l':
        return -90
      default:
        return 90
    }
  }

  /**
   * Get direction of robot as direction
   * @param direction angle as number(0, 90, 180, 270)
   * @returns
   */
  const getDirection = (direction: number): Direction => {
    switch (direction) {
      case 0:
        return "n"
      case 90:
        return "e"
      case 180:
        return "s"
      case 270:
        return "w"
      default:
        return "n"
    }
  }

  /**
   * Animate the robor
   * @param instruction
   * @param value
   */
  const animate = (instruction: "angle" | "left" | "top", value: number) => {
    const direction = value > 0 ? "+" : "-"
    robot.animate(instruction, `${direction}=${Math.abs(value).toString()}`, {
      duration: 10,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: function() {
        if (robot.angle === 360) {
          robot.set({ angle: 0 })
        }
        if (robot.angle < 0) {
          robot.set({ angle: 360 + robot.angle })
        }
        if (position) {
          const positionLeft = Math.round(robot.left / size)
          const positionTop = Math.round(robot.top / size)
          const positionDirection = getDirection(robot.angle)
          position.innerHTML = `${positionLeft} ${positionTop} ${positionDirection}`
        }
      },
      easing: fabric.util.ease["easeOutSine"]
    });
  }

  /**
   * Move finds out if the instruction is a new direction or a move
   * Then it send the new direction and position to draw
   * @param instruction string
   */
  const move = (instruction: string) => {
    const tDirection = translateToEnglish(instruction);
    let newDirection = currentDirection;
    if (["r", "l"].indexOf(tDirection) > -1) {
      newDirection = turn(tDirection as Turn)
      animate("angle", newDirection)
    }
    if (tDirection === "f") {
      switch (robot.angle) {
        case 90:
          animate("left", size)
          break
        case 180:
          animate("top", size)
          break
        case 270:
          animate("left", -size)
          break
        case 0:
        default:
          animate("top", -size)
          break
      }
    }
  }


  /**
   * Reset the playground
   */
  const reset = () => {
    robot.set({ left: originalPosition.left, top: originalPosition.top, angle: 0})
    canvas.renderAll()
  }

  /**
   * Init Robot
   */
  const init = (left: number, top: number, shape: string, squares: number) => {
    canvas.remove(...canvas.getObjects());
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    originalPosition = {
      left,
      top,
    }
    size = canvas.getWidth() / squares
    border = new fabric.Rect({
      fill: "#fafafa",
      left: 0,
      height: canvas.getHeight(),
      opacity: 1,
      selectable: false,
      strokeWidth: 1,
      stroke: "red",
      top: 0,
      width: canvas.getWidth()
    })
    if (shape === "circle") {
      canvas.viewportTransform = [1, 0, 0, 1, canvas.getWidth() / 2, canvas.getHeight() / 2]
      border = undefined
      border = new fabric.Circle({
        fill: "#fafafa",
        left: -canvas.getWidth() / 2,
        opacity: 1,
        radius: canvas.getWidth() / 2,
        selectable: false,
        strokeWidth: 1,
        stroke: "red",
        top: -canvas.getHeight() / 2
      })
    }
    canvas.add(border)
    fabric.loadSVGFromURL('robot.svg', function(objects: any, options: any) {
      robot = fabric.util.groupSVGElements(objects, options)
      robot.set({
        width: 25,
        height: 25,
        originX: "center",
        originY: "center",
        angle: 0
      })
      robot.set({
        left: size * left,
        top: size * top
      })
      if (shape === "circle") {
        robot.set({
          left: left,
          top: top
        })
      }
      robot.selectable = false
      robot.evented = false
      canvas.add(robot)
      canvas.renderAll()
    });
  }

  return {
    move: move,
    reset: reset,
    init: init,
  }
})()