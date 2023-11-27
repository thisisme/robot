import { Robot } from './robot'
import './style.css'

const robot = Robot

const drawPlayground = (size: number) => {
  let html: string = "";
  let i: number = 0;
  for (i; i < size; i++) {
    html += "<div class='horizontal'>";
    let j: number = 0;
    for (j; j < size; j++) {
      html += `<div id="box-${i}${j}" class="box"></div>`;
    }
    html += "</div>";
  }
  document.querySelector<HTMLDivElement>('#playground')!.innerHTML = html;
}

const drawPlaygroundCircle = (size: number) => {
  let html: string = "";
  let i: number = 0;
  for (i; i <= size; i++) {
    html += "<div class='horizontal'>";
    let j:number = 0;
    let end: number = i === 0 ? 1 : i * 2;
    for (j; j < end; j++) {
      html += `<div id="box-${i}${j}" class="box"></div>`;
    }
    html += "</div>"
  }
  let newSize = size * 2 + 1;
  let end:number = i;
  for (i; i <= newSize; i++) {
    html += "<div class='horizontal reverse'>";
    end--;
    let j:number = end === 0 ? 1 : (end - 1) * 2;
    for (j; j > 0; j--) {
      html += `<div id="box-${i}${j}" class="box"></div>`;
    }
    html += "</div>"
  }
  document.querySelector<HTMLDivElement>('#playground')!.innerHTML = html;
}

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
  robot.reset();
});



drawPlayground(5);
// drawPlaygroundCircle(5);
// robot.reset();
