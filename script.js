const gameContainer = document.getElementById("game-container");
let playerSymbol = true;
let verdict = "";
const gameState = [
  [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
  [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
  [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
];

function horizontalMatching(row, col) {
  let count = 0;
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[row][i].symbol === gameState[row][col].symbol) {
      count++;
    }
  }
  if (count === 3) {
    return true;
  }
  return false;
}

function verticalMatching(row, col) {
  let count = 0;
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i][col].symbol === gameState[row][col].symbol) {
      count++;
    }
  }
  if (count === 3) {
    return true;
  }
  return false;
}

function diagonalMatching(row, col) {
  let count = 0;
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i][i].symbol === gameState[row][col].symbol) {
      count++;
    }
  }
  if (count === 3) {
    return true;
  }

  count = 0;
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i][2 - i].symbol === gameState[row][col].symbol) {
      count++;
    }
  }
  if (count === 3) {
    return true;
  }
  return false;
}

function checkDrawAndWinning(row, col) {
  if (horizontalMatching(row, col) || verticalMatching(row, col)) {
    verdict = "Win";
    return;
  }
  if (Math.abs(row - col) != 1 && diagonalMatching(row, col)) {
    verdict = "Win";
    return;
  }
  verdict = "Draw";
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState.length; j++) {
      if (gameState[i][j].symbol == "") {
        verdict = "";
        return;
      }
    }
  }
}

function onCellClick(i, j) {
  if (gameState[i][j].symbol != "" || verdict === "Win") {
    return;
  }
  gameState[i][j].symbol = playerSymbol === true ? "O" : "X";
  checkDrawAndWinning(i, j);
  renderScreen();
  playerSymbol = !playerSymbol;
}

function resetGame() {
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      gameState[i][j].symbol = "";
    }
  }
  verdict = "";
  renderScreen();
}

function renderScreen() {
  const rows = document.getElementsByClassName("row");
  for (let i = 0; i < gameState.length; i++) {
    const cells = rows[i].getElementsByClassName("cell");
    for (let j = 0; j < gameState[i].length; j++) {
      const symbol = gameState[i][j].symbol;
      cells[j].innerText = symbol;
      cells[j].classList.remove(...["o-marker", "x-marker"]);
      symbol &&
        cells[j].classList.add(symbol === "O" ? "o-marker" : "x-marker");
      cells[j].addEventListener("click", () => onCellClick(i, j));
    }
  }
  const gameVerdictWrapper = document.getElementsByClassName("game-verdict")[0];
  gameVerdictWrapper.classList.remove("visible");
  const gameVerdictContainer =
    document.getElementsByClassName("verdict-text")[0];
  const playAgainButton =
    document.getElementsByClassName("play-again-button")[0];
  playAgainButton.addEventListener("click", resetGame);

  if (verdict === "Win") {
    gameVerdictContainer.innerText = `Player ${
      playerSymbol === true ? "O" : "X"
    } is the winner.`;
    gameVerdictWrapper.classList.add("visible");
  }
  if (verdict === "Draw") {
    gameVerdictContainer.innerText = "It's a tie!";
    gameVerdictWrapper.classList.add("visible");
  }
}

renderScreen();
