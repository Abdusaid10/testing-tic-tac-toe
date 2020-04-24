const Board = () => {
  const grid = new Array(9).fill(null);
  const winCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
  ];

  const mark = (pos, symbol) => {
    grid[pos] = symbol;
  };

  const positionsBySymbol = symbol => {
    const positions = [];
    grid.forEach((value, pos) => {
      if (value === symbol) {
        positions.push(pos);
      }
    });
    return positions;
  };

  const getWinCombo = symbol => {
    const positions = positionsBySymbol(symbol);
    return winCombs.find(value => value.every(c => positions.includes(c)));
  };

  const isWon = symbol => {
    if (getWinCombo(symbol)) {
      return true;
    }
    return false;
  };

  const isFull = () => !grid.some(pos => pos === null);

  const isEmptyCell = pos => !grid[pos];

  return {
    getWinCombo,
    mark,
    isWon,
    isFull,
    isEmptyCell,
  };
};

// eslint-disable-next-line import/prefer-default-export
export { Board as default };