
/*
//place an X event handler
document.getElementById('1').addEventListener('click', function(){
    console.log('you want to add an X');
    document.getElementById('1').innerHTML = 'X';
    keepScores.push([1, "X"]);
    console.log(keepScores);
});

//how do we abstract this so we don't have to write one for every single id, yet nonetheless add them to an array?

document.getElementById('2').addEventListener('click', function(){
    console.log('you want to add an X');
    document.getElementById('2').innerHTML = 'X';
    keepScores.push([2, "X"]);
    console.log(keepScores);
});
*/
//we'll also have to make sure that you can only add the item to the array once

////////


var scoreBoard = []; //associative array that tracks what place has what mark
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

//use quryselectorall to select all of the game squares. Perhaps make the game squares be a table instead of divs like you are right now

//create a function to start the game
function startGame(){
    document.querySelector(".endgame").style.display = "none";//hide the game reset button
    //create the array of scores
    //Array.prototype.keys()
    scoreBoard = Array.from(Array(9).keys());
    //clear the board at the start of the game
    //use a for loop to go over all the cells and clear their content
    for (var i = 0; i < cells.length; i++){
        cells[i].innerText = '';
        cells[i].style.removeProperty('background-color'); //and if your're using a background color, clear the background color as an indicato
        cells[i].addEventListener('click', turnClick, false);
    }  
}

function turnClick(square) {
    console.log(square.target.id);
    turn(square.target.id, human);
}

function turn(squareId, player) {
    scoreBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    console.log("scoreBoard is " + scoreBoard);
}