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
startGame(); //if you don't do this nothing works, because the event handlers are inside the startgame funciton


//create the function that starts the game which does the following
function startGame(){
    //set the endgame pop-up to invistible at the start
    document.querySelector(".endgame").style.display = "none";
    //populate the scoreBoard array 
    scoreBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //iterate through all the visible cells and do the following things
    for (var i = 0; i < cells.length; i++){
        //make them blank
        cells[i].innerHTML = '';
        //clear them of color (which we use later to mark a winner)
        cells[i].style.backgroundColor = '';
        //add an event listener to each cell that calls another function (turnClick) that contorls what happens when you click
        cells[i].addEventListener('click', turnClick, false); //what does false do???
    }
}
   
//create the function that controls what happens when you click on a square (takes a parameter "square" so you know what square you're manipulating)
function turnClick(square){
    console.log("You have clicked " + square.target.id);
    //check that no one has played in the suare yet if true then do:
        //the human takes their turn using the turn() function, which takes two paramaters, the id of the square, and the player (as in human or computer)
        //the reason we don't go directly to "turn" is it can be called by the human or the computer
        turn(square.target.id, human);
        //the computer takes their turn
            //the computer checks if it's a tie, and if it's not a tie
            //the computer takes its turn using the turn function, which takes two paramaters, the id of the suare and the player
}

//create the turn function, which take two paramaters: the id of the square in play, and the player
function turn(squareId, player){
    //update the place in the scorekeeping array with the token of the current player
    scoreBoard[squareId] = player;
    //update the visual display so the player's token appears in the square (hint: use innerText)
    cells[squareId].innerHTML = player;
    //use a checkWin function (which takes 2 parameters, scoreboard, and player); assign the output of the function to a local variable (gameWon) using the "let" keywor (instead of "var") (this will return either null which is falsy or some object, I think, which is truthy
    let gameWon = checkWin(scoreBoard, player);
    //if gameWon is truthy, pass the gameWon object into the gameOver function
    if (gameWon) gameOver(gameWon);
}

//create the checkwin() function which takes two paramaters: the state of the scoreboard, and the current player
function checkWin(board, player){
    //create a local variable plays, which is an array, which contains only those plays on the scoreboard that were placed by the current player --> hint, use Array.reduce on the board, also this is where the original uses ES6 style but you do you
    /*let plays = board.reduce((acc, cuVa, index) => 
        (cuVa === player) ? acc.concat(index) : acc, []);
    console.log(plays); */
    
    let plays = board.reduce(function(acc, cuVa, index) {
        if (cuVa === player){
            return acc.concat(index);   
        }                     
        else return acc;                     
    },[]);
    
    //create a local variable gameWon and set its default to null
    let gameWon = null;
    
    
    //using for..of keyword, iteratie through every subarray in the winning combinations array -- check here for how https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
    //for the index and array pair of each item in the array of winning combination arrays 
    for (let [index, win] of winConditions.entries()){
        //if (we iterate over every element in the win combo --> taking each element and checking if it's found inside the plays array --> and find it's found)(hint use "every" method)
        if (win.every(element => plays.indexOf(element) > -1)) {
            //then we set gameWon to a key-value array pair of index:index and player: player
            gameWon = {index: index, player: player};
            console.log(gameWon);
            //leave the function with a break as soon as you win because no need to go fruther
            break;
        }
    //return the gameWon which we have just determined
    return gameWon;
    }    
}

//create the gameOver funciton which takes the gameWon returned from checkwin() as a parameter
function gameOver(gameWon){
    //highlight the squares that are part of the winning combos
    //use the index of the gameWon to call the right winConditions
    for (let index of winConditions[gameWon.index]){
        document.getElementById(index).style.backgroundColor = 
            gameWon.player == human ? "blue" : "red";
    }
    for (var i = 0; cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }
    //and then use getElementById to color the square
    //do a ternery operation to determine what color, humans one color, computer a different color
}

//create the declareWinner function that takes one paramater (who)
    //set the modal to display
    //set the text of the modal to be who won (human or computer)

//create the funciton emptySquares
        //filter the scoreboard array and accept only those items which are numbers (because once a place is filled it gets a letter X or O)

//create the function bestStpot which takes no argument
    //have it return the first available item created by the empty squares function

//create a function that checks for a tie
    //if there are no more emty squares
        //iterate through the length of all the cells
        //change the background color of each square to green
        //remove the click event listiner
        //call the declareWinner funciton and pass it "Tie game"
        //return true
    //otherwise return false


    
    






