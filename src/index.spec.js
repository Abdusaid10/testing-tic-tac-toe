import { UIModule as ui, DataModule as dm } from './index';

describe('Game', () => {
  const playerName1 = 'player1';
  const playerName2 = 'player2';
  const player1 = dm.Player(playerName1, 'X');
  const player2 = dm.Player(playerName2, 'O');
  const game = dm.Game(dm.Board, player1, player2);
  const activePlayerSym = game.getActivePlayer().getSymbol();

  test('active player', () => {
    expect(activePlayerSym).toBe('X');
  });
});