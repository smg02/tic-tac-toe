const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector("#submit")

let playerOne, playerTwo;

dialog.showModal()

closeDialog.addEventListener("click", (e) => {
    if (document.querySelector("#player-one-name").value === '') {
        return 0;
    } else if (document.querySelector("#player-two-name").value === '') {
        return 0;
    } else {
        playerOne = player(document.querySelector('#player-one-name').value, 'x');
        playerTwo = player(document.querySelector('#player-two-name').value, 'y');
        e.preventDefault();
        dialog.close();
    }
}, false)

const GameBoard = (function () {
    let gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let spotOccupied = false;
    let wonYet = false;

    const getSpotInfo = () => spotOccupied;
    const getWinnerStat = () => wonYet;

    const getGameBoard = () => gameBoard;

    const placeMarker = (index, marker) => {
        if (gameBoard[index] == 'x' || gameBoard[index] == 'y') {
            console.log("Occupied!");
            spotOccupied = true;
        } else {
            gameBoard[index] = marker;
            spotOccupied = false;
        }
    }

    const checkWinner = () => {
        if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2] || gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5] || gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]) {
            console.log(`${gameFlow.getCurrentPlayer().name} wins`);
            wonYet = true;
            reset();
        }

        if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6] || gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] || gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8]) {
            console.log(`${gameFlow.getCurrentPlayer().name} wins`);
            wonYet = true;
            reset()
        }

        if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8] || gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
            console.log(`${gameFlow.getCurrentPlayer().name} wins`);
            wonYet = true;
            reset()
        }
    }

    const reset = () => {
        gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }
    return { getGameBoard, placeMarker, getSpotInfo, checkWinner, getWinnerStat, reset }
})();

function player(name, marker) {
    
    const getPlayerName = () => name;

    let playerPoints;
    const getPlayerPoints = () => playerPoints;

    const getPlayerMarker = () => marker;

    return { getPlayerName, getPlayerPoints, getPlayerMarker }
}

const gameFlow = (() => {
    const gb = GameBoard;

    const players = [
        {
            name: playerOne.getPlayerName(),
            marker: playerOne.getPlayerMarker()
        },
        {
            name: playerTwo.getPlayerName(),
            marker: playerTwo.getPlayerMarker()
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
    console.log(`${getCurrentPlayer().name}'s turn`);

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
})()

gameFlow