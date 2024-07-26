const notification = document.querySelector("#notification");
const container = document.querySelector("#app-container");
const squares = document.querySelectorAll(".square");
const axis = [
  new Set([0, 1, 2]),
  new Set([3, 4, 5]),
  new Set([6, 7, 8]),
  new Set([0, 3, 6]),
  new Set([1, 4, 7]),
  new Set([2, 5, 8]),
  new Set([0, 4, 8]),
  new Set([6, 4, 2]),
];
let turn = "O";

function endGame(index) {
  let positions = new Set();
  squares.forEach((square, i) => {
    square.classList.remove("illegal");
    if (square.innerText === turn) positions.add(i);
  });
  for (i = 0; i < axis.length; i++) {
    if (axis[i].isSubsetOf(positions)) {
      return true;
    }
  }
  return false;
}

function notify(msg) {
  notification.innerHTML = `<h2>${msg}</h2>`;
  notification.showModal();
}

function changeTurn() {
  if (turn === "O") turn = "X";
  else turn = "O";
}

function makeMove(target, i) {
  target.innerText = turn;
  target.classList.add("busy");
  target.classList.add(turn);
  if (!endGame(i)) changeTurn();
  else notify(`${turn} wins!`);
}

function moveAttemp(target, i) {
  if (target.classList.contains("busy")) target.classList.add("illegal");
  else makeMove(target, i);
}

squares.forEach((square, i) => {
  square.classList.remove("illegal");
  square.onclick = () => moveAttemp(square, i);
});
