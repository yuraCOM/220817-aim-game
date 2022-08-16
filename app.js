const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeElem = document.querySelector("#time");
const board = document.querySelector("#board");

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board?.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target?.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreseTime, 1000);
  createRandomCircle();
  timeElem.innerHTML = `00:${time}`;
}

function decreseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    timeElem.innerHTML = `00:${current}`;
  }
}

function finishGame() {
  timeElem?.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomN(15, 55);
  const { width, height } = board?.getBoundingClientRect();
  const x = getRandomN(0, width - size - 2);
  const y = getRandomN(0, height - size - 2);
  circle.classList.add("circle");
  circle.style.background = randcolor();
  circle.style.border = `2px solid ${randcolor()}`;
  board.style.border = `1px solid ${randcolor()}`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  board.append(circle);
}

function getRandomN(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randcolor() {
  let rflags = new Array(
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F"
  );
  let colors = "";
  for (let i = 0; i < 6; i++) {
    let numb = Math.floor(Math.random() * 15);
    colors += rflags[numb];
  }
  return "#" + colors;
}
