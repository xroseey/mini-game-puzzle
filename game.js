const gameFiles = document.querySelectorAll(".tile");

const gameBoard = document.querySelector("#game-board");

const gameState = [
  [gameFiles[0], gameFiles[1], gameFiles[2]],
  [gameFiles[3], gameFiles[4], gameFiles[5]],
  [gameFiles[6], gameFiles[7], gameFiles[8]],
];

function render(gameBoard, gameState) {
  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      column.style.top = `${rowIndex * 100}px`;
      column.style.left = `${columnIndex * 100}px`;
      gameBoard.appendChild(column);
    });
  });
}

function moveElement(element1, element2) {
  const tempTop = element1.style.top;
  const tempLeft = element2.style.left;

  element1.style.top = element2.style.top;
  element1.style.left = element2.style.left;

  element2.style.top = tempTop;
  element2.style.left = tempLeft;
}

render(gameBoard, gameState);

gameBoard.addEventListener("click", (event) => {
  const target = event.target;

  let x, y;

  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column === target) {
        x = rowIndex;
        y = columnIndex;
      }
    });
  });

  let emptyX, emptyY;

  gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (column.innerText === "") {
        emptyX = rowIndex;
        emptyY = columnIndex;
      }
    });
  });

  if (
    (y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
    (x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
  ) {
    const temp = gameState[x][y];
    gameState[x][y] = gameState[emptyX][emptyY];
    gameState[emptyX][emptyY] = temp;
    render(gameBoard, gameState);
  }
});
