

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

//we'll also have to make sure that you can only add the item to the array once

////////


var scoreBoard = []; //associative array that tracks what place has what mark
var human = 'O';
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

//use quryselectorall to select all of the game squares. Perhaps make the game squares be a table instead of divs like you are right now

//create a function to start the game
function startGame(){
    //create the array of scores
    //Array.prototype.keys()
    scoreBoard = Array.from(Array(9).keys());
    //clear the board at the start of the game
    //use a for loop to go over all the cells and clear their content
    //and if your're using a background color, clear the background color as an indicator
    
}