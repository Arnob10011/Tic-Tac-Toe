const boxEl = document.querySelectorAll(".box");
const currPlayer = document.querySelector(".current--player");

const restartEl = document.querySelector(".restart");

let board = ["", "", "", "", "", "", "", "", ""];
let clicked = true;
let currentPlayer = "❌";
function boxClicked(box) {
  const boxData = box.target;
  persons(boxData);
}

function persons(box) {
  handleCellPlayed(box);
  gameVaidation();

  // For The first Person
  if (clicked) {
    box.textContent = "❌";
    currPlayer.textContent = `⁣⭕'s turn`;
    clicked = false;
  }
  // for the Second Person
  else {
    box.textContent = "⁣⭕";
    currPlayer.textContent = "❌'s turn";
    clicked = true;
  }
}

function resultText(text) {
  const playerResult = document.querySelector(".player--results");
  playerResult.textContent = text;
}

function handleCellPlayed(data) {
  const dataIndex = +data.dataset.num;
  board[dataIndex] = clicked ? currentPlayer : "⁣⭕";
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function gameVaidation() {
  let roundWound = false;
  for (let i = 0; i <= 7; i++) {
    const winningCondition = winningConditions[i];
    const a = board[winningCondition[0]];
    const b = board[winningCondition[1]];
    const c = board[winningCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWound = true;
      break;
    }
  }
  if (roundWound) {
    if (clicked) {
      showPlayerResult();
      resultText("❌ Won");
    } else {
      showPlayerResult();
      resultText("⁣⭕ Won");
    }
  }

  const checkBoard = board.every((ele) => ele !== "");

  if (!roundWound && checkBoard) {
    setTimeout(showPlayerResult, 1600);
    resultText("it's a draw");
  }
}

function showPlayerResult() {
  const showResult = document.querySelector(".show__result");
  const boxContent = document.querySelector(".box__content");
  showResult.style.display = "flex";
  currPlayer.style.display = "none";
  boxContent.classList.add("blur--effect");
}

boxEl.forEach((box) => {
  box.addEventListener("click", boxClicked);
});

function restart() {
  const showResult = document.querySelector(".show__result");
  const boxContent = document.querySelector(".box__content");
  showResult.style.display = "none";
  currPlayer.style.display = "block";
  boxContent.classList.remove("blur--effect");
  currPlayer.textContent = "❌'s turn";

  clicked = true;
  for (let i = 0; i < boxEl.length; i++) {
    boxEl[i].textContent = "";
    board[i] = "";
  }
}

restartEl.addEventListener("click", restart);
