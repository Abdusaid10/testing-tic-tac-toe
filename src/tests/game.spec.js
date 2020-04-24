import Player from '../modules/player';
import Game from '../modules/game';

describe('Game', () => {
  const playerName1 = 'player1';
  const playerName2 = 'player2';
  const player1 = Player(playerName1, 'X');
  const player2 = Player(playerName2, 'O');
  const game = Game(player1, player2);
  const activePlayerSym = game.getActivePlayer().getSymbol();
  const game2 = Game(player1, player2);

  test('active player Symbol', () => {
    expect(activePlayerSym).toBe('X');
  });
  test('switch player', () => {
    game.switchPlayer();
    expect(game.getActivePlayer().getName()).toBe('player2');
  });
  test('next player', () => {
    expect(game.getNextPlayer().getName()).toBe('player1');
  });
  test('Return cell id and symbol of clicked cell', () => {
    // eslint-disable-next-line quote-props
    expect(game.turn('2')).toEqual({ 'pos': '2', 'symbol': 'O' });
  });
  test('isGameOver should return false', () => {
    game.turn('2');
    game.switchPlayer();

    game.turn('3');
    game.switchPlayer();

    game.turn('4');
    game.switchPlayer();
    expect(game2.isGameOver()).toBe(false);
  });
  test('isGameOver should return true', () => {
    game2.turn('2');
    game2.switchPlayer();

    game2.turn('3');
    game2.switchPlayer();

    game2.turn('4');
    game2.switchPlayer();

    game2.turn('5');
    game2.switchPlayer();

    game2.turn('6');
    game2.switchPlayer();

    game2.turn('7');
    game2.switchPlayer();

    game2.turn('8');
    expect(game2.isGameOver()).toBe(true);
  });
  it('it should return winning combo', () => {
    expect(game2.getWinCombo()).toEqual([2, 4, 6]);
  });
});