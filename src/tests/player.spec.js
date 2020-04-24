import Player from '../modules/player';

describe('Player', () => {
  const player1 = Player('Player1', 'X');
  const player2 = Player('Player2', 'O');

  test('get name player1', () => {
    expect(player1.getName()).toBe('Player1');
  });
  test('set new name to player1', () => {
    player1.setName('Name1');
    expect(player1.getName()).toBe('Name1');
  });
  test('add score', () => {
    player1.addScore();
    expect(player1.getScore()).toBe(1);
  });
  test('player1s symbol', () => {
    expect(player1.getSymbol()).toBe('X');
  });
  test('player2s symbol', () => {
    expect(player2.getSymbol()).toBe('O');
  });
});