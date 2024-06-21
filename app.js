document.addEventListener("DOMContentLoaded", () => {
    const dialogElement = document.querySelector("dialog");
    const submitButton = document.querySelector("#submit");

    // Displaying username and points
    const containerElement = document.querySelector(".container");
    const playerOneDisplay = document.querySelector("#display-player-one");
    const playerTwoDisplay = document.querySelector("#display-player-two");

    const playerOnePointsDisplay = document.querySelector("#p1-points");
    const playerTwoPointsDisplay = document.querySelector("#p2-points");

    const winnerMessage = document.createElement("div");
    winnerMessage.className = "winner";

    const github = document.querySelector(".footer");
    github.addEventListener("click", () => window.location.href = "https://github.com/smg02")

    let gameController;

    dialogElement.showModal();

    submitButton.addEventListener("click", (e) => {
        const playerOneNameInput = document.querySelector("#player-one-name").value;
        const playerTwoNameInput = document.querySelector("#player-two-name").value;

        if (playerOneNameInput === '' || playerTwoNameInput === '') {
            return;
        }

        e.preventDefault();
        dialogElement.close();

        const playerOne = createPlayer(playerOneNameInput, 'x');
        const playerTwo = createPlayer(playerTwoNameInput, 'y');

        playerOnePointsDisplay.textContent = playerOne.getPoints();
        playerTwoPointsDisplay.textContent = playerTwo.getPoints();

        playerOneDisplay.textContent = playerOne.getName();
        playerTwoDisplay.textContent = playerTwo.getName();

        // Initialize gameController after players are set
        gameController = createGameController(playerOne, playerTwo);
    });

    const gameBoardModule = (() => {
        const boardCells = document.querySelectorAll(".row");
        let boardState = Array(9).fill(null);
        let gameWon = false;

        boardCells.forEach((cell, index) => {
            cell.dataset.id = index;
            cell.addEventListener("click", () => {
                if (gameController && !gameWon && !cell.textContent) {
                    cell.textContent = gameController.getCurrentPlayer().getMarker();
                    gameController.handleMove(index);
                }
            });
        });

        const resetBoard = () => {
            gameWon = false;
            boardState.fill(null);
            boardCells.forEach((cell) => {
                cell.textContent = '';
            });
        };

        const placeMarker = (index, marker) => {
            if (!boardState[index]) {
                boardState[index] = marker;
            }
        };

        const checkWinner = () => {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6]             // diagonals
            ];

            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                    gameWon = true;
                    return true;
                }
            }

            if (boardState.every(cell => cell)) {
                return 'draw';
            }

            return false;
        };

        return { placeMarker, checkWinner, resetBoard };
    })();

    const createPlayer = (name, marker) => {
        let points = 0;

        return {
            getName: () => name,
            getMarker: () => marker,
            getPoints: () => points,
            incrementPoints: () => { points += 1; }
        };
    };

    const createGameController = (playerOne, playerTwo) => {
        const gameBoard = gameBoardModule;
        const players = [playerOne, playerTwo];
        let currentPlayer = players[0];

        const switchCurrentPlayer = () => {
            currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        };

        const getCurrentPlayer = () => currentPlayer;

        const handleMove = (index) => {
            gameBoard.placeMarker(index, getCurrentPlayer().getMarker());

            const winner = gameBoard.checkWinner();
            if (winner) {
                if (winner === 'draw') {
                    winnerMessage.textContent = "Game Draw";
                } else {
                    winnerMessage.textContent = `${getCurrentPlayer().getName()} wins`;
                    getCurrentPlayer().incrementPoints();
                    updatePointsDisplay();
                }
                containerElement.appendChild(winnerMessage);
                setTimeout(() => {
                    winnerMessage.remove();
                    gameBoard.resetBoard();
                }, 2000);
            } else {
                switchCurrentPlayer();
            }
        };

        const updatePointsDisplay = () => {
            playerOnePointsDisplay.textContent = playerOne.getPoints();
            playerTwoPointsDisplay.textContent = playerTwo.getPoints();
        };

        return { getCurrentPlayer, handleMove };
    };
});
