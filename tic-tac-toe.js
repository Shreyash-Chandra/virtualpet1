let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

function renderBoard() {
    let boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    board.forEach((cell, index) => {
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.innerText = cell;
        cellDiv.addEventListener("click", () => handleMove(index));
        boardDiv.appendChild(cellDiv);
    });
}

function handleMove(index) {
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    renderBoard();

    if (checkWinner()) {
        document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;

        if (currentPlayer === "X") {
            petData.tttWins++;
            petData.happiness += 10;
        } else {
            petData.happiness -= 5;
        }

        clampStats();
        savePet();

        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").innerText = "Player X's turn";
    renderBoard();
}

document.addEventListener("DOMContentLoaded", renderBoard);