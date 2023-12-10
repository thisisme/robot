
import { Robot } from './robot'
import './style.css'

const robot = Robot

const square = document.querySelector<HTMLButtonElement>("#initSquare")
const circle = document.querySelector<HTMLButtonElement>("#initCircle")

square?.addEventListener("click", () => {
  console.log("square")
  robot.init(1, 2, "square", 5)
})

circle?.addEventListener("click", () => {
  robot.init(1, 2, "circle", 10)
})

const instructionsForm = document.querySelector<HTMLFormElement>("#instructionsForm")!;
instructionsForm.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(instructionsForm);
  const formProps = Object.fromEntries(formData);
  const instructions = formProps.instructions.toString().toLowerCase()
  instructions.split("").forEach((instruction: string, index: number) => {
    setTimeout((tmpInstruction: string) => {
      robot.move(tmpInstruction);
    }, 100 * index, instruction)
  })
});

instructionsForm.addEventListener("reset", () => {
  robot.reset()
})

