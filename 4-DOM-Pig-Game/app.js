/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, notGameOver, prevRoll, winningScore;

init();

//annonymous function
//roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (notGameOver){
        //random number 
        var die1 = Math.floor(Math.random() * 6) + 1;
        var die2 = Math.floor(Math.random() * 6) + 1;

        //display result dice
        var die1Dom = document.getElementById('die1');
        var die2Dom = document.getElementById('die2');
        die1Dom.style.display = 'block';
        die2Dom.style.display = 'block';
        //change image
        die1Dom.src = 'dice-' + die1 + '.png';
        die2Dom.src = 'dice-' + die2 + '.png';
        
        //update round score IF number isn't a 1.
        if ((prevRoll[0] === 6 || prevRoll[1] === 6) &&
                    (die1 === 6 || die2 === 6)) {
                //lose all points
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
        } else if (die1 !== 1 && die2 !== 1) {
                //add score
                roundScore += (die1 + die2);     
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
                prevRoll = [die1,die2];
        } else {
            //change player
            nextPlayer();
        }
    }
    
}); //btn-roll event listener


//hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (notGameOver) {
        //Add current score to global score
        scores[activePlayer] += roundScore;

        //update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won game.
        if (scores[activePlayer] >= winningScore){
            //active player wins game
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //remove active
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //remove dice
            document.getElementById('die1').style.display = 'none';
            document.getElementById('die2').style.display = 'none';
            //game over
            notGameOver = false;

        } else {
            //Change Player 
            nextPlayer();
        }   
    }
});

function nextPlayer() {
    //Change Player
    //ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    prevRoll = [0,0];
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //toggle -> adds if not there, removes if there.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//callback
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0; //first in array;
    notGameOver = true;
    prevRoll = [0,0];
    
    winningScore = parseInt(document.getElementById('winScore').value);
    if (isNaN(winningScore)) { 
        winningScore = 100;
        document.getElementById('winScore').value = 100;
    } else {
        document.getElementById('winScore').value = winningScore;
    }
    
    document.getElementById('die1').style.display = 'none';
    document.getElementById('die2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    
}


/*
Coding Challenges

1) Player loses his turn and his entire score if he rolls two sixes in a row.
2) Input field to change the winning score of 100.
3) Add another dice to the game.

*/



/**********************
*** GENERAL NOTES
***********************/


//random number r in [1,6];
//dice = Math.floor(Math.random() * 6) + 1;

//change text content
//document.querySelector('#current-' + activePlayer).textContent = dice;

//change HTML code
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//reading html into variables.
//var x = document.querySelector('#score-' + activePlayer).textContent;

/**** Call back function example ****
function btn(){
    //Do something
}
btn();

//callback function
document.querySelector('.btn-roll').addEventListener('click', btn) 

//add and remove classes
//        document.querySelector('.player-0-panel').classList.remove('active');
//        document.querySelector('.player-1-panel').classList.add('active');        

***/























