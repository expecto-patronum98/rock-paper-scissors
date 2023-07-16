let playerScore = 0;
let computerScore = 0;

let displayPlayerScore = document.getElementById('player-score');
let displayComputerScore = document.getElementById('computer-score');

const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

rockBtn.addEventListener('click', () => handleClick('rock'));
paperBtn.addEventListener('click', () => handleClick('paper'));
scissorsBtn.addEventListener('click', () => handleClick('scissors'));

const playerPlayed = document.getElementById('player-played');
const computerPlayed = document.getElementById('computer-played');
const messageImage = document.getElementById('message-img');

let messageTitle = document.getElementById('message-title');
let messageSubtitle = document.getElementById('message-subtitle');

var gameoverOverlay = document.getElementById('gameover');

const playAgainBtn = document.getElementById('playagain-btn');
playAgainBtn.addEventListener('click', () => {
    messageTitle.innerText = ('It\'s your turn!');
    messageSubtitle.innerText = ('');
    playAgainBtn.style.visibility = 'hidden';
    setTimeout(() => {
        gameoverOverlay.style.visibility = 'hidden';
    }, 300);

    playerPlayed.src = "";
    computerPlayed.src = "";

    playerScore = 0;
    computerScore = 0;

    displayPlayerScore.innerText = ('Player: ' + playerScore);
    displayComputerScore.innerText = ('Computer: ' + computerScore);

    rockBtn.style.opacity = '1';
    paperBtn.style.opacity = '1';
    scissorsBtn.style.opacity = '1';
});

function handleClick(playerSelection) {
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
}

function playRound(playerSelection, computerSelection) {
    // display images of what player and computer played
    if (playerSelection === 'rock') playerPlayed.src = "./img/rock.png";
    else if (playerSelection === 'paper') playerPlayed.src = "./img/paper.png";
    else if (playerSelection === 'scissors') playerPlayed.src = "./img/scissors.png";

    if (computerSelection === 'rock') computerPlayed.src = "./img/rock.png";
    else if (computerSelection === 'paper') computerPlayed.src = "./img/paper.png";
    else if (computerSelection === 'scissors') computerPlayed.src = "./img/scissors.png";

    // play a round, add a point to the winner and display the outcome
    if (computerSelection === 'scissors' && playerSelection === 'rock' || computerSelection === 'rock' && playerSelection === 'paper' || computerSelection === 'paper' && playerSelection === 'scissors') {
        playerScore++;
        win(playerSelection, computerSelection);
    }
    else if (computerSelection === 'rock' && playerSelection === 'scissors' || computerSelection === 'paper' && playerSelection === 'rock' || computerSelection === 'scissors' && playerSelection === 'paper') {
        computerScore++;
        lose(playerSelection, computerSelection);
    }
    else if (computerSelection === playerSelection) {
        tie();
    }

    displayPlayerScore.innerText = ('Player: ' + playerScore);
    displayComputerScore.innerText = ('Computer: ' + computerScore);

    // if score is 5, display the gameover message and a "play again" button
    if (playerScore == 5 || computerScore == 5) {
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;

        rockBtn.style.opacity = '0.5';
        paperBtn.style.opacity = '0.5';
        scissorsBtn.style.opacity = '0.5';

        if (playerScore > computerScore) {
            playerPlayed.src = "./img/winner.png";
            computerPlayed.src = "./img/loser.png";
        }
        else {
            playerPlayed.src = "./img/loser.png";
            computerPlayed.src = "./img/winner.png";
        };
        setTimeout(() => {
            isGameOver(playerScore, computerScore);
        }, 3000);

        displayPlayerScore.innerText = ('Player: ' + playerScore);
        displayComputerScore.innerText = ('Computer: ' + computerScore);
    };
/*     
    console.log('Player score: ' + playerScore);
    console.log('Computer score: ' + computerScore); */
}

// this function will randomly return 'Rock', 'Paper' or 'Scissors' as computer choice
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

function win (playerSelection, computerSelection) {
    messageTitle.innerText = ('You won this round!');
    messageSubtitle.innerText = (playerSelection + ' beats ' + computerSelection);
};

function lose (playerSelection, computerSelection) {
    messageTitle.innerText = ('You lost, my friend!');
    messageSubtitle.innerText = (computerSelection + ' beats ' + playerSelection);
};

function tie () {
    messageTitle.innerText = ('It\'s a tie. Play again!');
    messageSubtitle.innerText = ('');
};


// is the game is over, display an overlay container with a "play again" button
function isGameOver (playerScore, computerScore) {
    // if the game is over display the gameover container
    gameoverOverlay.style.visibility = 'visible';
    playAgainBtn.style.visibility = 'visible';
    if (playerScore > computerScore) {
        messageImage.src = "./img/winner.png";
        const messageGameover = document.getElementById('message-gameover');
        messageGameover.innerText = 'Congrats! You Won!';
    }
    else {
        messageImage.src = "./img/loser.png";
        const messageGameover = document.getElementById('message-gameover');
        messageGameover.innerText = 'Oh no! You Lost.';
    }
    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;
};

