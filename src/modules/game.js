import Board from './board';

const Game = (...players) => {
  const switchPlayer = () => players.reverse();
  const getActivePlayer = () => players[0];
  const getNextPlayer = () => players[1];
  const board = Board();
  const isGameOver = () => board.isWon(getActivePlayer().getSymbol()) || board.isFull();

  const getWinner = () => board.isWon(getActivePlayer().getSymbol()) && players[0];

  const getWinCombo = () => board.getWinCombo(getActivePlayer().getSymbol());

  const turn = pos => {
    const cellID = pos.charAt(pos.length - 1);
    if (!board.isEmptyCell(cellID)) return;
    const symbol = getActivePlayer().getSymbol();
    board.mark(cellID, symbol);
    // eslint-disable-next-line consistent-return
    return { pos, symbol };
  };

  return {
    switchPlayer,
    getActivePlayer,
    getNextPlayer,
    isGameOver,
    getWinner,
    turn,
    getWinCombo,
  };
};
// eslint-disable-next-line import/prefer-default-export
export { Game as default };