import Player from '../modules/player';
import Board from '../modules/board';
import Game from '../modules/game';

describe('Board', () => {
  const playerName1 = 'player1';
  const playerName2 = 'player2';
  const player1 = Player(playerName1, 'X');
  const player2 = Player(playerName2, 'O');
  const board = Board();
  const game = Game(player1, player2);

  test('isEmptyCell should return true', () => {
    game.turn('3');
    board.mark('1', 'X');
    expect(board.isEmptyCell('2')).toBe(true);
  });
  test('isEmptyCell should return true', () => {
    game.turn('3');
    board.mark('2', 'X');
    expect(board.isEmptyCell('3')).toBe(true);
  });
  test('isEmptyCell should return false', () => {
    game.turn('3');
    board.mark('3', 'X');
    expect(board.isEmptyCell('3')).toBe(false);
  });
  test('isFull should return false', () => {
    expect(board.isFull()).toBe(false);
  });
  test('isFull should return true', () => {
    board.mark('0', 'X');
    board.mark('1', 'O');
    board.mark('2', 'X');
    board.mark('3', 'O');
    board.mark('4', 'X');
    board.mark('5', 'X');
    board.mark('6', 'O');
    board.mark('7', 'O');
    board.mark('8', 'X');
    expect(board.isFull()).toBe(true);
  });
  test('isWon should return true', () => {
    expect(board.isWon('X')).toBe(true);
  });
  test('isWon should return false', () => {
    expect(board.isWon('O')).toBe(false);
  });
  test('should return winning combination', () => {
    expect(board.getWinCombo('X')).toEqual([0, 4, 8]);
  });
});