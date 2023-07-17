let playerScore = 0;
let computerScore = 0;

let displayPlayerScore = document.getElementById('player-score');
let displayComputerScore = document.getElementById('computer-score');

const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');

const playerPlayed = document.getElementById('player-played');
const computerPlayed = document.getElementById('computer-played');
const messageImage = document.getElementById('message-img');

let messageTitle = document.getElementById('message-title');
let messageSubtitle = document.getElementById('message-subtitle');

var gameoverOverlay = document.getElementById('gameover');
var startgameOverlay = document.getElementById('startpage')

const startgameBtn = document.getElementById('startpage-btn');
const playAgainBtn = document.getElementById('playagain-btn');
const restartBtn = document.getElementById('restartBtn');

const scoreText = document.getElementById('scoreBlock');

rockBtn.addEventListener('click', () => handleClick('rock'));
paperBtn.addEventListener('click', () => handleClick('paper'));
scissorsBtn.addEventListener('click', () => handleClick('scissors'));

startgameBtn.addEventListener('click', () => {
    startgameBtn.style.visibility = 'hidden';
    setTimeout(() => {
        startgameOverlay.style.visibility = 'hidden';
    }, 300);
}, { once: true });

playAgainBtn.addEventListener('click', () => {
    restart();
});

restartBtn.addEventListener('click', () => {
    restart();
});

function handleClick(playerSelection) {
    scoreText.style.paddingTop = '84px';
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
    if (
        computerSelection === 'scissors'&& playerSelection === 'rock'
        || computerSelection === 'rock' && playerSelection === 'paper'
        || computerSelection === 'paper' && playerSelection === 'scissors'
        ) {
        playerScore++;
        win(playerSelection, computerSelection);
    }
    else if (
        computerSelection === 'rock' && playerSelection === 'scissors'
        || computerSelection === 'paper' && playerSelection === 'rock'
        || computerSelection === 'scissors' && playerSelection === 'paper'
        ) {
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
        restartBtn.disabled = true;

        rockBtn.style.opacity = '0.5';
        paperBtn.style.opacity = '0.5';
        scissorsBtn.style.opacity = '0.5';
        restartBtn.style.opacity = '0.5';

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
    }
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
    let message = getRandomSentenceWin();
    messageTitle.style.color = 'green';
    messageTitle.innerText = (message);
    messageSubtitle.innerText = (playerSelection + ' beats ' + computerSelection);
};

function lose (playerSelection, computerSelection) {
    let message = getRandomSentenceLose();
    messageTitle.style.color = 'red';
    messageTitle.innerText = (message);
    messageSubtitle.innerText = (computerSelection + ' beats ' + playerSelection);
};

function tie () {
    messageTitle.style.color = 'var(--neutral-color)';
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
    restartBtn.disabled = false;
};

function restart () {
    messageTitle.style.color = 'var(--neutral-color)';
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

    scoreText.style.paddingTop = '34px';

    displayPlayerScore.innerText = ('Player: ' + playerScore);
    displayComputerScore.innerText = ('Computer: ' + computerScore);

    rockBtn.style.opacity = '1';
    paperBtn.style.opacity = '1';
    scissorsBtn.style.opacity = '1';
    restartBtn.style.opacity = '1';
};

// create random sentences for win round
function getRandomSentenceWin () {
    var index = Math.floor(Math.random() * (winSentences.length));
    return winSentences[index];
}

let winSentences = [
    'Yay, you won!',
    'Nice job, you\'re killin\' it',
    'You won this round!',
    'Yee, you won!',
    'You won! Great job',
    'Holy guacamole! You did it! Victory is yours!',
    'Hey, guess what? You just won the round!',
    "You won, boss!",
    "Dominating round, victorious!",
    "Crushed it, congrats!",
    "Boom! You're champion!",
    "Woohoo you won! Party time!",
    "You're the winner!",
    "Hats off, conqueror!",
    "Holy moly, gaming legend!",
    "Stop, you nailed it!",
    "Yippee ki-yay! Round victory!",
    "Hurray! Dance party time!",
    "Round won, mic drop!",
    "On fire, superstar!",
    "Ding ding ding! Champ!",
    "Victory sound, yours!",
    "Winning mode activated!",
    "Holy smokes! Well done!",
    "Congrats, epic winner!",
    "Round won, epic achievement!",
    "You rule! Round conquered!"
];

// create random sentences for lose round
function getRandomSentenceLose () {
    var index = Math.floor(Math.random() * (loseSentences.length));
    return loseSentences[index];
}

const loseSentences = [
    "Better luck next time!",
    "Oops, you lost!",
    "Keep trying, buddy!",
    "Don't give up!",
    "Defeat, but not forever!",
    "It's just a round.",
    "You'll get 'em next time!",
    "Close, but no win.",
    "Losing happens, chin up!",
    "One step closer!",
    "Learning through losses.",
    "The comeback's brewing!",
    "You lose but stay in the game!",
    "Falling short this time.",
    "Ups and downs, remember!",
    "Failure fuels success.",
    "Oh no! Learning experience, valuable!",
    "You lose. Shake it off!",
    "Next time, victory awaits!",
    "Stay strong, keep playing!",
    "You're closer than before!",
    "Failure breeds resilience.",
    "Rome wasn't built overnight.",
    "You're a fighter, remember!"
  ];
  