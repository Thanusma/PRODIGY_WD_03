document.addEventListener("DOMContentLoaded", function () {
    const playerXButton = document.querySelector(".playerX");
    const playerOButton = document.querySelector(".playerO");
    const selectBox = document.querySelector(".select-box");
    const playBoard = document.querySelector(".play-board");
    const resultBox = document.querySelector(".result-box");
    const wonText = document.querySelector(".won-text");
    const replayButton = document.querySelector(".btn button");
    const Xturn = document.querySelector(".Xturn");
    const Oturn = document.querySelector(".Oturn");
    const sliders = document.querySelector(".slider");
    const boxes = document.querySelectorAll(".play-area span");
  
    let currentPlayer = "X";
    let playerXSelections = [];
    let playerOSelections = [];
    let winner = null;
  
    // Function to handle player selection
    function handleSelection(box, index) {
      if (currentPlayer === "X") {
        playerXSelections.push(index);
        box.textContent = "X";
        Xturn.style.color = "black";
        Oturn.style.color = "greenyellow";
        sliders.style.left = "50%";
      } else {
        playerOSelections.push(index);
        box.textContent = "O";
        Xturn.style.color = "black";
        Oturn.style.color = "black";
        sliders.style.left = "0";
      }
      box.classList.add("occupied");
    }
  
    // Function to check for a winner
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          playerXSelections.includes(a) &&
          playerXSelections.includes(b) &&
          playerXSelections.includes(c)
        ) {
          winner = "X";
          break;
        } else if (
          playerOSelections.includes(a) &&
          playerOSelections.includes(b) &&
          playerOSelections.includes(c)
        ) {
          winner = "O";
          break;
        }
      }
  
      if (winner) {
        wonText.textContent = `${winner} wins!`;
        resultBox.classList.add("show");
      } else if (
        playerXSelections.length + playerOSelections.length ===
        boxes.length
      ) {
        wonText.textContent = "It's a draw!";
        resultBox.classList.add("show");
      }
    }
  
    // Function to handle replay button click
    function handleReplay() {
      playerXSelections = [];
      playerOSelections = [];
      winner = null;
  
      boxes.forEach((box) => {
        box.textContent = "";
        box.classList.remove("occupied");
      });
  
      resultBox.classList.remove("show");
      selectBox.classList.remove("hide");
      playBoard.classList.remove("show");
      Xturn.style.color = "greenyellow";
      Oturn.style.color = "greenyellow";
      sliders.style.left = "0";
      currentPlayer = "X";
    }
  
    // Event listener for player selection buttons
    playerXButton.addEventListener("click", function () {
      selectBox.classList.add("hide");
      playBoard.classList.add("show");
    });
  
    playerOButton.addEventListener("click", function () {
      selectBox.classList.add("hide");
      playBoard.classList.add("show");
      currentPlayer = "O"; // Start with O's turn if O is selected first
      Oturn.style.color = "black";
      sliders.style.left = "0";
    });
  
    // Event listener for play area boxes
    boxes.forEach((box, index) => {
      box.addEventListener("click", function () {
        if (!box.classList.contains("occupied") && !winner) {
          handleSelection(box, index);
          checkWinner();
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      });
    });
  
    // Event listener for replay button
    replayButton.addEventListener("click", handleReplay);
  });
  