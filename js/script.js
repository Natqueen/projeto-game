const mario = document.querySelector('.mario');
const gameBoard = document.querySelector('.game-board');
let isGameOver = false;
let speed = 2; // Velocidade inicial do Mario é 2
let loop;
let pipeInterval;

const jump = () => {
  if (isGameOver) {
    return;
  }

  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 500);
};

const createPipe = () => {
  const pipe = document.createElement('img');
  pipe.src = './js/images/pipe.png';
  pipe.classList.add('pipe');
  gameBoard.appendChild(pipe);

  return pipe;
};

const movePipes = () => {
  const pipes = document.querySelectorAll('.pipe');

  pipes.forEach((pipe) => {
    const pipePosition = pipe.offsetLeft - speed;

    if (pipePosition < -80) {
      pipe.remove();
    } else {
      pipe.style.left = `${pipePosition}px`;

      const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

      if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
        gameOver();
      }
    }
  });
};

const gameLoop = () => {
  if (isGameOver) {
    return;
  }

  const pipe = createPipe();
  pipeInterval = setInterval(movePipes, 10);
};

const gameOver = () => {
  isGameOver = true;
  clearInterval(loop);
  clearInterval(pipeInterval);

  const pipes = document.querySelectorAll('.pipe');
  pipes.forEach((pipe) => pipe.remove());

  mario.classList.remove('jump');
  mario.src = "./js/images/lost.png";
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Reiniciar';
  restartButton.addEventListener('click', restartGame);

  const restartContainer = document.createElement('div');
  restartContainer.classList.add('restart-container');
  restartContainer.appendChild(restartButton);
  gameBoard.appendChild(restartContainer);
};

const restartGame = () => {
  isGameOver = false;
  speed = 2; // Reinicia a velocidade do Mario para 2
  const restartContainer = document.querySelector('.restart-container');
  restartContainer.remove();

  mario.src = "./js/images/mario.gif";
  mario.style.width = '150px';
  mario.style.marginLeft = '0';

  loop = setInterval(gameLoop, 2000);
};

document.addEventListener('keydown', jump);

loop = setInterval(gameLoop, 2000);
