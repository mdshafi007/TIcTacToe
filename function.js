const cells = document.querySelectorAll(".cell");
      const result = document.querySelector(".result");
      let currentPlayer = "x";
      let gameActive = true;
      let gameState = ["", "", "", "", "", "", "", "", ""];

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

      function handleCellClick(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(
          clickedCell.getAttribute("data-index")
        );

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
          return;
        }

        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.classList.add(currentPlayer);
        clickedCell.textContent = currentPlayer.toUpperCase();

        if (checkWin()) {
          result.textContent = `Player ${currentPlayer.toUpperCase()} Wins!`;
          gameActive = false;
          return;
        }

        if (checkDraw()) {
          result.textContent = "It's a Draw!";
          gameActive = false;
          return;
        }

        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }

      function checkWin() {
        return winningConditions.some((condition) => {
          return condition.every((index) => gameState[index] === currentPlayer);
        });
      }

      function checkDraw() {
        return gameState.every((cell) => cell !== "");
      }

      function resetGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        result.textContent = "";
        currentPlayer = "x";
        cells.forEach((cell) => {
          cell.classList.remove("x", "o");
          cell.textContent = "";
        });
      }

      cells.forEach((cell) => {
        cell.addEventListener("click", handleCellClick);
      });