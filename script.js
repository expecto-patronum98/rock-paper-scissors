// The function will randomly return 'Rock', 'Paper' or 'Scissors'
function getComputerChoice() {

    let randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

let computerScore = 0;
let playerScore = 0;
let computerSelection;
let playerSelection;

// The function take two parameters (playerSelection & computerSelection) and return a string with round's winner/loser and scores
function playRound(playerSelection, computerSelection) {
    computerSelection = getComputerChoice();
    console.log(computerSelection);
    playerSelection = prompt("Your choice:").toLowerCase();
    let messageWin = 'You win! ' + playerSelection + ' beats ' + computerSelection;
    let messageLose = 'You lose! ' + computerSelection + ' beats ' + playerSelection;
    let messageTie = 'It\'s a tie. Play again!'

    if (computerSelection === 'scissors' && playerSelection === 'rock' || computerSelection === 'rock' && playerSelection === 'paper' || computerSelection === 'paper' && playerSelection === 'scissors') {
        playerScore++;
        console.log(messageWin);
    }
    else if (computerSelection === 'rock' && playerSelection === 'scissors' || computerSelection === 'paper' && playerSelection === 'rock' || computerSelection === 'scissors' && playerSelection === 'paper') {
        computerScore++;
        console.log(messageLose);
    }
    else if (computerSelection === playerSelection) {
        console.log(messageTie);
    }
    else {
        console.log('Invalid input.')
    }
    console.log('Player score: ' + playerScore);
    console.log('Computer score: ' + computerScore);
}

// The function calls playRound() until a player's score is 3
function game() {
    for (let i = 0; i < 5; i++) {
        playRound(playerSelection, computerSelection)
    }
    if (computerScore > playerScore) {
        console.log('YOU LOSE!');
    }
    else if (computerScore < playerScore) {
        console.log('YOU WIN!');
    }
    else {
        console.log('TIE GAME!');
    }
}


game();

