//this game was created with help from the JavaScript Tic Tac Toe Project Tutorial

var scoreBoard = []; //array that tracks what place has what mark
var human = 'O'; //this is the default we'll add an interaction to let the player choose X or 0
var computer = 'X';
var winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
var cells = document.querySelectorAll('.cell'); //so you can just act on all the cells at once
startGame(); 

function startGame(){
    //set the endgame pop-up to invistible at the start
    document.querySelector(".endgame").style.display = "none";
    //populate the scoreBoard array 
    scoreBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (var i = 0; i < cells.length; i++){
        cells[i].innerHTML = ''; //clear the board of markers
        cells[i].style.backgroundColor = ''; //clear the board of color
        //make the board respond to clicks
        cells[i].addEventListener('click', turnClick, false); 
    }
}
   
function turnClick(square){
    //check that no one has played in the suare yet
    if (typeof scoreBoard[square.target.id] == 'number'){
        //We don't go directly to "turn" because it be called by the human or the computer
        turn(square.target.id, human); //human takes turn
        //check if it's not a tie game, then computer takes turn
        if (!checkTie()) turn(bestSpot(), computer);
    }        
}

function bestSpot(){
    return emptySquares()[0];
}

function emptySquares() {
    return scoreBoard.filter(square => typeof square === 'number');
}

function checkTie() {
    if (emptySquares().length == 0){ ////if there are no more emty squares
        for (var i = 0; i < cells.length; i++){
            cells[i].style.backgroundColor = 'green';
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie game");
        return true;
    }
    return false;
}

function declareWinner(who){
    //show the pop up declaring who won the game
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}

function turn(squareId, player){
    //update the scorekeeping array with the player's token
    scoreBoard[squareId] = player;
    //update the visual display with the player's token 
    document.getElementById(squareId).innerText = player;
    //check who won
    let gameWon = checkWin(scoreBoard, player);
    if (gameWon) gameOver(gameWon);
}

function checkWin(board, player){
    //create an array of plays played on the board by the current player
    let plays = board.reduce((acc, cuVa, index) => 
        (cuVa === player) ? acc.concat(index) : acc, []);
    
    let gameWon = null;
    
    for (let [index, win] of winConditions.entries()) {
        //if (we iterate over every element in the win combo --> taking each element and checking if it's found inside the plays array --> and find it's found)(hint use "every" method)
        if (win.every(element => plays.indexOf(element) > -1)) {
            //then we set gameWon to a key-value array pair of index:index and player: player
            gameWon = {index: index, player: player};
           
            //leave the function with a break as soon as you win 
            break;
        };
    }    
    return gameWon;
}

function gameOver(gameWon){
    //highlight the squares that are part of the winning combos
    for (let index of winConditions[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
            gameWon.player == human ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    //create a message in the modal that says who won
    declareWinner(gameWon.player === human ? "You win" : "You lose");
    
}

