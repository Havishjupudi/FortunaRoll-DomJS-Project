'use strict';
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);

const score0el = document.getElementById('score--0');
const score1el = document.getElementById('score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const instbtn = document.querySelector('.instruction-btn');

const closebtn = document.querySelector('.close-modal');
const closemodal = document.querySelector('.modal');
const closeoverlay = document.querySelector('.overlay');

const modal = document.querySelector('.modal');

var end = Date.now() + 15 * 1000;
var colors = ['#bb0000', '#ffffff'];

let confettiActive = false;

let activePlayer;
let currentScore;
let score;
let playing;

function initialize() {
  // INTIALIZE EVERYTHING TO NORMAL
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0el.textContent = 0;
  score1el.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;

  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  diceEl.classList.add('hidden');

  document.querySelector(`.winner-pop.player--0`).classList.add('hidden');
  document.querySelector(`.winner-pop.player--1`).classList.add('hidden');
  document.querySelector(`.winner-pops`).classList.remove('blur');
}

const close = function () {
  closemodal.classList.add('hidden');
  closeoverlay.classList.add('hidden');
};

initialize();

closebtn.addEventListener('click', close);

btnRoll.addEventListener('click', function () {
  // ROLL THE DICE BUTTON
  // check playing
  if (playing) {
    // roll the dice
    let rolledNum = Math.trunc(Math.random() * 6) + 1;

    // show the dice img
    diceEl.classList.remove('hidden');
    diceEl.src = `imgs/dice-imgs/dice-${rolledNum}.png`;

    // if 1 next player
    if (rolledNum === 1) {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // switch player
      document
        .querySelector(`.player.player--${activePlayer}`)
        .classList.remove('player--active');
      activePlayer = activePlayer === 0 ? 1 : 0;
      document
        .querySelector(`.player.player--${activePlayer}`)
        .classList.add('player--active');
      // add current score
    } else {
      currentScore += rolledNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  // HOLD BUTTON
  // check playing
  if (playing) {
    // add current score to main score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check winner
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
      end = Date.now() + 15 * 1000; // Reset the end time to 15 seconds from now
      showConfetti();
      document
        .querySelector(`.winner-pop.player--${activePlayer}`)
        .classList.remove('hidden');
      document.querySelector(`.winner-pops`).classList.add('blur');
    }

    // intialize current score to zero
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // switch player
    document
      .querySelector(`.player.player--${activePlayer}`)
      .classList.remove('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
    document
      .querySelector(`.player.player--${activePlayer}`)
      .classList.add('player--active');
    currentScore = 0;
  }
});

console.log(`Current active player: ${activePlayer}`);
console.log(`Current score of player ${activePlayer}: ${score[activePlayer]}`);

btnNew.addEventListener('click', function () {
  stopConfetti();
  initialize();
}); // NEW GAME BUTTON

instbtn.addEventListener('click', function () {
  closemodal.classList.remove('hidden');
  closeoverlay.classList.remove('hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    console.log(e);
    close();
  }
});

function showConfetti() {
  confettiActive = true;
  (function frame() {
    if (!confettiActive) return; // Stop if confettiActive is false

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end && confettiActive) {
      requestAnimationFrame(frame);
    }
  })();
}

function stopConfetti() {
  confettiActive = false;
}
