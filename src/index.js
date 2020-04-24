import Game from './modules/game';
import Player from './modules/player';

import './styles/style.css';

const UIModule = (() => {
  const DOMSelectors = {
    startButton: '#btn-start',
    resetButton: '#btn-reset',
    board: '#gameBoard',
    allCells: '.cell',
    message: '#message-line',
    gameHelper: '#gameHelper',
  };
  const startBtn = document.querySelector(DOMSelectors.startButton);

  const player1Input = document.getElementById('player1-input');
  const player2Input = document.getElementById('player2-input');
  const player1Display = document.querySelector('#player1-display');
  const player2Display = document.querySelector('#player2-display');
  const player1Score = document.querySelector('#player1-score');
  const player2Score = document.querySelector('#player2-score');

  const getPlayersName = (player) => {
    switch (player) {
      case 'player1':
        return player1Input;
      case 'player2':
        return player2Input;
      default:
        return 'Anonymous';
    }
  };

  const updatePlayersName = () => {
    player1Display.innerText = player1Input.value; //
    player2Display.innerText = player2Input.value; //
  };

  const updatePlayerScore = player => {
    if (player.getSymbol() === 'X') {
      player1Score.innerText = player.getScore();
    } else {
      player2Score.innerText = player.getScore();
    }
  };

  const getDOMSelectors = () => DOMSelectors;
  const markPosition = ({ pos, symbol }) => {
    const cell = document.querySelector(`#${pos}`);
    cell.innerText = symbol;
  };

  const showMessage = message => {
    const messageNode = document.querySelector(DOMSelectors.message);
    messageNode.innerText = message;
  };

  const updateStartButton = (status = '') => {
    switch (status) {
      case 'start':
        startBtn.innerText = 'Restart';
        startBtn.className = 'btn btn-warning btn-lg btn-block';
        break;
      case 'finish':
        startBtn.innerText = 'Play Again!';
        startBtn.className = 'btn btn-success btn-lg btn-block';
        break;
      default:
        startBtn.innerText = 'Start';
        startBtn.className = 'btn btn-primary btn-lg btn-block';
    }
  };

  const showWinCombo = combo => {
    combo.forEach(pos => {
      const el = document.querySelector(`#cell${pos}`);
      el.style.background = 'lightseagreen';
    });
  };

  const clearBoard = () => {
    const cells = document.querySelectorAll(DOMSelectors.allCells);

    cells.forEach(c => {
      c.innerText = '';
      c.style.background = 'white';
    });
  };

  return {
    DOMSelectors,
    getDOMSelectors,
    getPlayersName,
    updatePlayersName,
    updatePlayerScore,
    markPosition,
    showWinCombo,
    showMessage,
    updateStartButton,
    clearBoard,
  };
})();

const Controller = ((UI) => {
  const DOM = UI.getDOMSelectors();
  const player1 = Player(UI.getPlayersName('player1'), 'X');
  const player2 = Player(UI.getPlayersName('player2'), 'O');
  let gameSwitch = false;

  const resetGame = () => {
    window.location.reload(true);
  };

  const startGame = () => {
    const name1 = UI.getPlayersName('player1').value;
    const name2 = UI.getPlayersName('player2').value;

    if (name1 !== 'Player1') { player1.setName(name1); }
    if (name2 !== 'Player2') { player2.setName(name2); }

    UI.clearBoard();

    const game = Game(player1, player2);
    const boardNode = document.querySelector(DOM.board);

    if (gameSwitch) {
      game.switchPlayer();
      UI.showMessage(`Play Again! Now ~ ${game.getActivePlayer().getName()} ~ First!!`);
      gameSwitch = false;
    } else {
      UI.showMessage(`Game Started! ~ ${game.getActivePlayer().getName()} ~, You First!`);
      gameSwitch = true;
    }

    UI.updateStartButton('start');
    UI.updatePlayersName();

    const runGame = event => {
      const clickedCell = event.target.id;
      const clickedCellValue = event.target.innerText;
      if (clickedCell === undefined || clickedCellValue !== '') return;

      UI.showMessage(` ~ ${game.getNextPlayer().getName()} ~, you are Next!!!`);

      const mark = game.turn(clickedCell);

      if (mark !== undefined) {
        UI.markPosition(mark);

        if (game.isGameOver()) {
          const winner = game.getWinner();
          if (winner) {
            UI.showWinCombo(game.getWinCombo());
            winner.addScore();
            UI.updatePlayerScore(winner);
            UI.showMessage(`Congratulation! ${winner.getName()} won!`);
          } else {
            UI.showMessage('The Board is full, please try again!');
          }
          UI.updateStartButton('finish');
          boardNode.removeEventListener('click', runGame);
        }
        game.switchPlayer();
      }
    };

    boardNode.addEventListener('click', runGame);
  };

  const init = () => {
    document
      .querySelector(DOM.startButton)
      .addEventListener('click', startGame);
    document.querySelector(DOM.resetButton).addEventListener('click', resetGame);
  };

  return { init };
})(UIModule);

document.addEventListener('DOMContentLoaded', () => {
  Controller.init();
});

export {
  Controller, UIModule, Game,
};
