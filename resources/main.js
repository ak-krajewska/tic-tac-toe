/*jshint browser: true, esversion: 6 */

//this game was created with help from the JavaScript Tic Tac Toe Project Tutorial
//TODO: Add a slight lag after the player plays before the computer plays so doesn't feel like the player is causing both action
//TODO: Let players select if they want to play vs a smart AI or random AI
//TODO: Change the token chooser so it's not part of the pop up and interrupts every game but is instead a selction you can make before any moves are played on the board
//TODO: Improve color aesthetics
//TODO: be consistant about "let" and "var" in iterators

let scoreBoard = []; //array that tracks what place has what mark
let human = 'O'; 
let computer = 'X';
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
let cells = document.querySelectorAll('.cell'); //so you can just act on all the cells at once
startGame(); 

function startGame(){
    //set the endgame pop-up to invisible at the start
    document.querySelector(".endgame").style.display = "none";
    //populate the scoreBoard array 
    scoreBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < cells.length; i++){
        cells[i].innerHTML = ''; //clear the board of markers
        cells[i].style.backgroundColor = ''; //clear the board of color
    }
    
    chooseTokenClick();
}

function chooseTokenClick(){
    //show a modal that's exactly like .endgame
    document.querySelector(".choose-token").style.display = "block";
    //it has two clickable areas, X and O
    //add an event listener on the X and O
    document.getElementById('O').addEventListener('click', chooseToken, false);
    document.getElementById('X').addEventListener('click', chooseToken, false);
    //event listiner calls a function that does the selection
}

function chooseToken(token){
    //set the players token
    human = token.target.id;
    window.console.log("human plays " + human);
    //set the computers token
    computer = (human === "O") ? "X" : "O";
    window.console.log("computer plays " + computer);
    //activate the board for clicks
    for (let i = 0; i < cells.length; i++){
        //make the board respond to clicks
        cells[i].addEventListener('click', turnClick, false); //this should happen AFTER they choose a token
    }
    //then hide the modal & remove the event listener
    document.querySelector(".choose-token").style.display = "none";
    document.getElementById('O').removeEventListener('click', chooseToken, false);
    document.getElementById('X').removeEventListener('click', chooseToken, false); 
}
   
function turnClick(square){
    //check that no one has played in the suare yet
    if (typeof scoreBoard[square.target.id] == 'number'){
        //We don't go directly to "turn" because it be called by the human or the computer
        turn(square.target.id, human); //human takes turn
        //check if the human has one, that it's not a tie game, then computer takes turn
        //if (!checkTie()) turn(bestSpot(), computer);
        if (!checkWin(scoreBoard, human) && !checkTie()){
            setTimeout(function(){turn(bestSpot(), computer);}, 500); //pause before computer goes
        }
    }        
}

function bestSpot(){
    //return emptySquares()[0]; 
    return minimax(scoreBoard, computer).index; //returns the index of the object that minimix returns, which is where the computer wants to play
}

function minimax(newBoard, player) {
    let availSpots = emptySquares(newBoard);
    
    if (checkWin(newBoard, player)) {
        return {score: -10};  
    } else if (checkWin(newBoard, computer)){
        return {score: 20};
    }else if (availSpots.length === 0) {
        return {score: 0};
    }
    let moves = [];
    for (let i = 0; i < availSpots.length; i++){
        let move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
                              
        if (player == computer) {
            let result = minimax(newBoard, human);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, computer);
            move.score = result.score;
        }                     
        newBoard[availSpots[i]] = move.index;
        
        moves.push(move);
    }
    
    let bestMove;
    if (player === computer) {
        let bestScore = -10000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 10000;
        for(let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    
    return moves[bestMove];
}


function emptySquares() {
    return scoreBoard.filter(square => typeof square === 'number');
}

function checkTie() {
    if (emptySquares().length == 0){ ////if there are no more emty squares
        for (let i = 0; i < cells.length; i++){
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
        }
    }    
    return gameWon;
}

function gameOver(gameWon){
    //highlight the squares that are part of the winning combos
    for (let index of winConditions[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
            gameWon.player == human ? "blue" : "red";
    }
    for (let i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    //create a message in the modal that says who won
    declareWinner(gameWon.player === human ? "You win" : "You lose");
    
}

