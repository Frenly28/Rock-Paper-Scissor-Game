const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');

const resultText = document.querySelector('.resultText');
const pScoreText = document.querySelector('.pScoreText');
const compScoreText = document.querySelector('.compScoreText');

const raceButtons = document.querySelectorAll('.race');
const reset = document.querySelector('.reset');

const h3 = document.querySelector('h3');

let targetScore = 0;
const moves = ['rock', 'paper', 'scissors'];

function disableMoveButtons(state) {
  rock.disabled = state;
  paper.disabled = state;
  scissors.disabled = state;
}

function compPlayer() {
  return moves[Math.floor(Math.random() * 3)];
}

function playRound(playerMove) {
  const compMove = compPlayer();

  if (playerMove === compMove) {
    resultText.textContent = 'Tie!';
  } else if (
    (playerMove === 'rock' && compMove === 'scissors') ||
    (playerMove === 'paper' && compMove === 'rock') ||
    (playerMove === 'scissors' && compMove === 'paper')
  ) {
    pScoreText.textContent = +pScoreText.textContent + 1;
    resultText.textContent = `You win! ${playerMove} beats ${compMove}`;
  } else {
    compScoreText.textContent = +compScoreText.textContent + 1;
    resultText.textContent = `You lose! ${compMove} beats ${playerMove}`;
  }

  checkGameOver();
}

function checkGameOver() {
  const pScore = +pScoreText.textContent;
  const cScore = +compScoreText.textContent;

  if (pScore >= targetScore) {
    resultText.textContent =
      '🎉 You win! Press reset to start again.';
    disableMoveButtons(true);
  } else if (cScore >= targetScore) {
    resultText.textContent =
      '😢 You lose! Press reset to start again.';
    disableMoveButtons(true);
  }
}

function startGame(mode) {
  targetScore = mode;
  pScoreText.textContent = 0;
  compScoreText.textContent = 0;
  h3.textContent = '';
  resultText.textContent = `🎮 You are playing Race to ${mode}! Choose your move!`;

  disableMoveButtons(false);

  raceButtons.forEach((btn) => (btn.style.display = 'none'));

  reset.style.display = 'inline-block';
  resultText.parentElement.style.display = 'block';
}

rock.addEventListener('click', () => playRound('rock'));
paper.addEventListener('click', () => playRound('paper'));
scissors.addEventListener('click', () => playRound('scissors'));

raceButtons.forEach((btn) => {
  btn.addEventListener('click', () => startGame(+btn.dataset.score));
});

reset.addEventListener('click', () => {
  targetScore = 0;
  pScoreText.textContent = 0;
  compScoreText.textContent = 0;
  resultText.textContent = '';
  h3.textContent = 'Select Game Mode:';

  disableMoveButtons(true);

  raceButtons.forEach((btn) => (btn.style.display = 'inline-block'));

  reset.style.display = 'none';
  resultText.parentElement.style.display = 'none';
});
