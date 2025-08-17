const player_1 = document.getElementById("player-1");
const player_2 = document.getElementById("player-2");
const submit = document.getElementById("submit");
const userContainer = document.querySelector(".user-container");
const boardContainer = document.querySelector(".board-container");
const message = document.querySelector(".message");
let board = document.getElementsByClassName("board")[0];

let currentPlayer = "x";

// Handle form submit
const handleSubmit = () => {
  if (player_1.value.trim() && player_2.value.trim()) {
    boardContainer.style.display = "block";
    userContainer.style.display = "none";
    // show message for first player
    message.innerHTML = `${player_1.value}, you're up`;
  } else {
    alert("Please enter both player names!");
  }
};
submit.addEventListener("click", handleSubmit);


// Handle each move
const handleMove = (e) => {
  if (e.target.innerHTML === "") {
    e.target.innerHTML = currentPlayer;

    // check winner after placing
    if (checkWinner()) {
      message.innerHTML = `${currentPlayer === "x" ? player_1.value : player_2.value} ongratulations you won!`;
      board.removeEventListener("click", handleMove); // stop further moves
      // setTimeout(() => {
      //   window.location.reload()
      // },3000)
      return; // exit
    }

    // switch player if no winner
    if (currentPlayer === "x") {
      currentPlayer = "o";
      message.innerHTML = `${player_2.value}, you're up`;
    } else {
      currentPlayer = "x";
      message.innerHTML = `${player_1.value}, you're up`;
    }
  }
};



// Winning combinations
const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

// Check winner function
const checkWinner = () => {
  const cells = document.querySelectorAll(".cell"); // adjust if your board is built with divs
  for (let pattern of winPatterns) {
    let [a,b,c] = pattern;
    if (
      cells[a].innerHTML !== "" &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[b].innerHTML === cells[c].innerHTML
    ) {
      return cells[a].innerHTML; // "x" or "O"
    }
  }
  return null;
};



board.addEventListener("click", handleMove);
