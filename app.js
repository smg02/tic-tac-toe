const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector("#submit");

// displaying username
const container = document.querySelector(".container");
const displayerPlayerOne = document.querySelector("#display-player-one");
const displayerPlayerTwo = document.querySelector("#display-player-two");

const winnerDiv = document.createElement("div");

let p1, p2;
let gameFlow; // Declare gameFlow globally

dialog.showModal()

closeDialog.addEventListener("click", (e) => {
    if (document.querySelector("#player-one-name").value === '') {
        return 0;
    } else if (document.querySelector("#player-two-name").value === '') {
        return 0;
    } else {
        e.preventDefault();
        dialog.close();
        p1 = player(document.querySelector('#player-one-name').value, 'X');
        p2 = player(document.querySelector('#player-two-name').value, 'Y');


        displayerPlayerOne.textContent = p1.getPlayerName();
        displayerPlayerTwo.textContent = p2.getPlayerName();

        // Initialize gameFlow after players are set
        gameFlow = (() => {
            const gb = GameBoard;

            const players = [
                {
                    name: p1.getPlayerName(),
                    marker: p1.getPlayerMarker()
                },
                {
                    name: p2.getPlayerName(),
                    marker: p2.getPlayerMarker()
                }
            ];

            let currentPlayer = players[0];

            const switchCurrentPlayer = () => {
                if (currentPlayer === players[0]) {
                    currentPlayer = players[1]
                } else {
                    currentPlayer = players[0]
                }
            }

            const getCurrentPlayer = () => currentPlayer;
            console.log(`${getCurrentPlayer().marker}'s turn`);

            console.log(gb.getGameBoard());

            const playRound = (value) => {
                gb.placeMarker(value, getCurrentPlayer().marker);
                console.log(gb.getGameBoard());
                if (gb.getSpotInfo() === true) {
                    console.log(`${getCurrentPlayer().name}'s turn`);
                } else {
                    gb.checkWinner()
                    switchCurrentPlayer();
                    if (gb.getWinnerStat() === false) console.log(`${getCurrentPlayer().name}'s turn`);
                }
            }
            return { getCurrentPlayer, playRound }
        })();
    }
}, false);

const GameBoard = (function () {
    const gridBoard = document.querySelectorAll(".row");

    gridBoard.forEach((element, index) => {
        element.dataset.id = index;
        element.addEventListener("click", (e) => {
            e.target.textContent = gameFlow.getCurrentPlayer().marker;
            gameFlow.playRound(index);
        })
    })


    let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let spotOccupied = false;
    let wonYet = false;

    const getSpotInfo = () => spotOccupied;
    const getWinnerStat = () => wonYet;

    const getGameBoard = () => gameBoard;

    const placeMarker = (index, marker) => {
        if (gameBoard[index] == 'X' || gameBoard[index] == 'Y') {
            console.log("Occupied!");
            spotOccupied = true;
        } else {
            gameBoard[index] = marker;
            spotOccupied = false;
        }
    }

    const checkWinner = () => {
        if ((gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2]) ||
            (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5]) ||
            (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8])) {
            console.log(`${gameFlow.getCurrentPlayer().name} wins`);
            winnerDiv.textContent = `${gameFlow.getCurrentPlayer().name} wins`;
            container.append(winnerDiv)
            wonYet = true;
            reset();
        }

        if ((gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6]) ||
            (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7]) ||
            (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8])) {
            console.log(`${gameFlow.getCurrentPlayer().name} wins`);
            winnerDiv.textContent = `${gameFlow.getCurrentPlayer().name} wins`;
            container.append(winnerDiv)
            wonYet = true;
            reset()
        }

        if ((gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) ||
            (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6])) {
            console.log(`${gameFlow.getCurrentPlayer().name} wins`);
            winnerDiv.textContent = `${gameFlow.getCurrentPlayer().name} wins`;
            container.append(winnerDiv)
            wonYet = true;
            reset()
        }

        if ((gameBoard[0] === 'X' || gameBoard[0] === 'Y') && (gameBoard[1] === 'X' || gameBoard[1] ===  'Y') && (gameBoard[2] === 'X' || gameBoard[2] ===  'Y') && (gameBoard[3] === 'X' || gameBoard[3] ===  'Y') && (gameBoard[4] === 'X' || gameBoard[4] ===  'Y') && (gameBoard[5] === 'X' || gameBoard[5] ===  'Y') && (gameBoard[6] === 'X' || gameBoard[6] ===  'Y') && (gameBoard[7] === 'X' || gameBoard[7] ===  'Y') && (gameBoard[8] === 'X' || gameBoard[8] ===  'Y')) {
            winnerDiv.textContent = `Game Draw`;
            container.append(winnerDiv)
            wonYet = true;
            reset()
        }
    }

    const reset = () => {
        wonYet = false;
        gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        gridBoard.forEach((element) => {
            element.replaceChildren()
        })
    }
    return { getGameBoard, placeMarker, getSpotInfo, checkWinner, getWinnerStat, reset }
})();

const player = (name, marker) => {

    const getPlayerName = () => name;

    let playerPoints;
    const getPlayerPoints = () => playerPoints;

    const getPlayerMarker = () => marker;

    return { getPlayerName, getPlayerPoints, getPlayerMarker }
}


