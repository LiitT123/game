const start = document.getElementById("start");
const game = document.getElementById("game");
const time = document.getElementById("time");
const result = document.getElementById("result");
const timeH1 = document.getElementById("time-header");
const timeH2 = document.getElementById("result-header");
const inputTime = document.getElementById("game-time");
let score = 0;
let isGameActive = false;

const startGame = () => {
  score = 0;
  timeH1.classList.remove("hide");
  timeH2.classList.add("hide");
  time.textContent = inputTime.value;
  inputTime.setAttribute("disabled", "");
  isGameActive = true;
  start.classList.add("hide");
  game.style.backgroundColor = "white";
  renderBox();
  let interval = setInterval(function () {
    let currentTime = Number(time.textContent);
    if (currentTime <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      time.textContent = (currentTime - 0.1).toFixed(1);
    }
  }, 100);
};

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
const div = document.createElement("div");
const renderBox = () => {
  let randomSize = getRandom(30, 100);
  let maxDelta = 300 - randomSize;
  game.innerHTML = "";
  div.className = "box";
  div.style.width = `${randomSize}px`;
  div.style.height = `${randomSize}px`;
  div.style.position = "absolute";
  div.style.backgroundColor = "black";
  div.style.top = `${getRandom(0, maxDelta)}px`;
  div.style.left = `${getRandom(0, maxDelta)}px`;
  div.style.cursor = "pointer";
  game.append(div);
};

const gameBoxClick = (event) => {
  if (event.target.classList.contains("box")) {
    score++;
    renderBox();
  }
  if (!isGameActive) {
    return;
  }
};

function endGame() {
  isGameActive = false;
  game.innerHTML = "";
  start.classList.remove("hide");
  div.style.backgroundColor = "gray";
  timeH1.classList.add("hide");
  timeH2.classList.remove("hide");
  result.textContent = score;
  inputTime.removeAttribute("disabled");
}

inputTime.addEventListener("change", () => {
  time.textContent = inputTime.value;
  timeH1.classList.remove("hide");
  timeH2.classList.add("hide");
});

start.addEventListener("click", startGame);
game.addEventListener("click", gameBoxClick);
