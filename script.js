const position = [
  "top left",
  "top center",
  "top right",
  "center left",
  "center center",
  "center right",
  "bottom left",
  "bottom center",
];
let grid = [0, 1, 2, 3, 4, 5, 6, 7, 8];

var current_score = 0;
const newGame = () => {
  let seq = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  grid = [];
  for (let i = 0; i < 9; i++) {
    const cur = seq.splice(Math.random() * seq.length, 1);
    grid.push(cur[0]);
  }
  current_score = 0;
  // display();
};

const shift = (idx) => {
  if (grid[idx - 1] == 8) {
    grid[idx - 1] = grid[idx];
    grid[idx] = 8;
  } else if (grid[idx + 1] == 8) {
    grid[idx + 1] = grid[idx];
    grid[idx] = 8;
  } else if (grid[idx + 3] == 8) {
    grid[idx + 3] = grid[idx];
    grid[idx] = 8;
  } else if (grid[idx - 3] == 8) {
    grid[idx - 3] = grid[idx];
    grid[idx] = 8;
  }
  current_score += 1;
  display();
};

const checkWin = () => {
  for (let i = 0; i < 9; i++) {
    if (grid[i] != i) {
      return false;
    }
  }
  return true;
};

const display = () => {
  let gridDiv = document.querySelector(".grid").cloneNode(false);
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add(".cell");
    if (grid[i] != 8) {
      cell.style.backgroundPosition = position[grid[i]];
      cell.style.backgroundImage = 'url("Assets/img.png")';
      cell.style.cursor = "pointer";
      cell.addEventListener("click", () => shift(i));
    }
    gridDiv.appendChild(cell);
  }
  document.querySelector(".grid").replaceWith(gridDiv);
  let score = document.querySelector(".score");
  score.innerText = current_score;
  setTimeout(() => {
    if (checkWin()) {
      current_score = 0;
      alert(
        "Congratulations! You solved the puzzle! Click on New Game to continue playing !!"
      );
    }
  }, 10);
};
newGame();
display();
// for new Game
document.querySelector("button").addEventListener("click", () => {
  newGame();
  display();
});
