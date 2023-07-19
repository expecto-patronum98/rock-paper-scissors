/* THE GAME */

const SELECTIONS = [
    {
        name: 'rock',
        img: './img/rock.png',
        beats: 'scissors'
    },
    {
        name: 'paper',
        img: './img/paper.png',
        beats: 'rock'
    },
    {
        name: 'scissors',
        img: './img/scissors.png',
        beats: 'paper'
    }
]

let playerScore = 0;
let computerScore = 0;

let displayPlayerScore = document.getElementById('player-score');
let displayComputerScore = document.getElementById('computer-score');

const playerPlayed = document.getElementById('player-played');
const computerPlayed = document.getElementById('computer-played');
const messageImage = document.getElementById('message-img');

let messageTitle = document.getElementById('message-title');
let messageSubtitle = document.getElementById('message-subtitle');

var gameoverOverlay = document.getElementById('gameover');
var startgameOverlay = document.getElementById('startpage')

const startgameBtn = document.getElementById('startpage-btn');
const selectionBtns = document.querySelectorAll('[data-selection]');
const playAgainBtn = document.getElementById('playagain-btn');
const restartBtn = document.getElementById('restartBtn');

startgameBtn.addEventListener('click', () => {
    startgameBtn.style.visibility = 'hidden';
    setTimeout(() => {
        startgameOverlay.style.visibility = 'hidden';
    }, 300);
}, { once: true });

selectionBtns.forEach(selectionBtns => {
    selectionBtns.addEventListener('click', e => {
        const selectionName = selectionBtns.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        playRound(selection)
    })
})

playAgainBtn.addEventListener('click', () => {
    restart();
});

restartBtn.addEventListener('click', () => {
    restart();
});

function handleClick(playerSelection) {
    const computerSelection = getComputerChoice();
    playRound(playerSelection, computerSelection);
}

function playRound(selection) {
    playerPlayed.src = selection.img
    const computerSelection = getComputerChoice()
    computerPlayed.src = computerSelection.img
    const youWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    if (youWinner) win(selection, computerSelection)
    else if (computerWinner) lose(selection, computerSelection)
    else tie(selection, computerSelection)

    displayPlayerScore.innerText = ('Player: ' + playerScore);
    displayComputerScore.innerText = ('Computer: ' + computerScore);

    // if score is 5, display the gameover overlay
    if (playerScore == 5 || computerScore == 5) {
        disableBtns()
        isGameOver(playerScore, computerScore)
    }
}

// returns true if the seletion wins over the opponent
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

// this function will randomly return an element of the SELECTIONS array
function getComputerChoice() {
    let randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex]
}

function win (selection, computerSelection) {
    playerScore++;
    let message = getRandomSentenceWin();
    playerPlayed.style.width = '60px';
    playerPlayed.style.opacity = '1';
    computerPlayed.style.opacity = '0.5';
    computerPlayed.style.width = '50px';
    messageTitle.style.color = 'green';
    messageTitle.innerText = (message);
    messageSubtitle.innerText = (selection.name + ' beats ' + computerSelection.name);
};

function lose (selection, computerSelection) {
    computerScore++;
    let message = getRandomSentenceLose();
    computerPlayed.style.width = '60px';
    computerPlayed.style.opacity = '1';
    playerPlayed.style.opacity = '0.5';
    playerPlayed.style.width = '50px';
    messageTitle.style.color = 'red';
    messageTitle.innerText = (message);
    messageSubtitle.innerText = (computerSelection.name + ' beats ' + selection.name);
};

function tie () {
    playerPlayed.style.width = '50px';
    playerPlayed.style.opacity = '0.5';
    computerPlayed.style.opacity = '0.5';
    computerPlayed.style.width = '50px';
    messageTitle.style.color = 'var(--neutral-color)';
    messageTitle.innerText = ('It\'s a tie. Play again!');
    messageSubtitle.innerText = ('');
};

// is the game is over, display an overlay container with a "play again" button
function isGameOver (playerScore, computerScore) {
    if (playerScore > computerScore) {
        playerPlayed.src = "./img/winner.png";
        computerPlayed.src = "./img/loser.png";
        messageImage.src = "./img/winner.png";
        const messageGameover = document.getElementById('message-gameover');
        messageGameover.innerText = 'Congrats! You Won!';
    }
    else {
        playerPlayed.src = "./img/loser.png";
        computerPlayed.src = "./img/winner.png";
        messageImage.src = "./img/loser.png";
        const messageGameover = document.getElementById('message-gameover');
        messageGameover.innerText = 'Oh no! You Lost.';
    }

    setTimeout(() => {
        gameoverOverlay.style.visibility = 'visible';
        playAgainBtn.style.visibility = 'visible';
        enableBtns()
    }, 1500);
};

function disableBtns () {
    selectionBtns.forEach(selectionBtns => {
        selectionBtns.disabled = true;
        restartBtn.disabled = true;
        selectionBtns.style.opacity = '0.5';
        restartBtn.style.opacity = '0.5';
    })
}

function enableBtns () {
    selectionBtns.forEach(selectionBtns => {
        selectionBtns.disabled = false;
        restartBtn.disabled = false;
        selectionBtns.style.opacity = '1';
        restartBtn.style.opacity = '1';
    })
}

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

    displayPlayerScore.innerText = ('Player: ' + playerScore);
    displayComputerScore.innerText = ('Computer: ' + computerScore);

    enableBtns();
};

// create random sentences for won round
function getRandomSentenceWin () {
    var index = Math.floor(Math.random() * (winSentences.length));
    return winSentences[index];
}

// create random sentences for lost round
function getRandomSentenceLose () {
    var index = Math.floor(Math.random() * (loseSentences.length));
    return loseSentences[index];
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